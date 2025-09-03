import { supabase } from '@/integrations/supabase/client';

// Cache for logo URLs to avoid repeated fetches
const logoCache = new Map<string, string>();

/**
 * Converts company name to a slug for file matching
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Gets possible filename variations for a company
 */
const getFilenameVariations = (companyName: string): string[] => {
  const slug = slugify(companyName);
  const variations = [
    slug,
    companyName.toLowerCase().replace(/\s+/g, ''),
    companyName.toLowerCase().replace(/\s+/g, '-'),
    companyName.toLowerCase().replace(/\s+/g, '_'),
  ];
  
  // Add variations without common suffixes
  const withoutSuffixes = variations.map(v => 
    v.replace(/(ltd|bhd|corp|inc|co|group|india|malaysia)$/gi, '')
      .replace(/-+$|_+$/, '')
  );
  
  return [...new Set([...variations, ...withoutSuffixes])];
};

/**
 * Recursively lists all files in a bucket folder
 */
const listAllFilesInBucket = async (bucket: string, prefix: string = '', depth: number = 0): Promise<string[]> => {
  if (depth > 3) return []; // Limit recursion depth
  
  try {
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list(prefix, {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error || !files) {
      console.error('Error listing files:', error);
      return [];
    }

    const allFiles: string[] = [];
    
    for (const file of files) {
      const fullPath = prefix ? `${prefix}/${file.name}` : file.name;
      
      if (file.metadata === null) {
        // This is a folder, recurse into it
        const subFiles = await listAllFilesInBucket(bucket, fullPath, depth + 1);
        allFiles.push(...subFiles);
      } else {
        // This is a file
        allFiles.push(fullPath);
      }
    }
    
    return allFiles;
  } catch (error) {
    console.error('Error listing files recursively:', error);
    return [];
  }
};

/**
 * Fetches available logos from Supabase storage recursively
 */
export const fetchAvailableLogos = async (): Promise<string[]> => {
  try {
    return await listAllFilesInBucket('brand assets');
  } catch (error) {
    console.error('Error fetching available logos:', error);
    return [];
  }
};

/**
 * Gets a signed URL for a logo file, falls back to public URL
 */
export const getLogoUrl = async (filename: string): Promise<string> => {
  try {
    // Try to get a signed URL first
    const { data: signedData, error } = await supabase.storage
      .from('brand assets')
      .createSignedUrl(filename, 3600); // 1 hour expiry

    if (signedData?.signedUrl && !error) {
      return signedData.signedUrl;
    }
    
    // Fallback to public URL
    const { data } = supabase.storage
      .from('brand assets')
      .getPublicUrl(filename);
    
    return data.publicUrl;
  } catch (error) {
    // Final fallback to public URL
    const { data } = supabase.storage
      .from('brand assets')
      .getPublicUrl(filename);
    
    return data.publicUrl;
  }
};

/**
 * Finds the best matching logo for a company name
 */
export const findLogoForCompany = async (companyName: string): Promise<string | null> => {
  // Check cache first
  if (logoCache.has(companyName)) {
    return logoCache.get(companyName)!;
  }

  try {
    const availableFiles = await fetchAvailableLogos();
    const variations = getFilenameVariations(companyName);
    
    // Common logo file extensions
    const extensions = ['.svg', '.png', '.webp', '.jpg', '.jpeg'];
    
    // Try exact matches first (including full paths with folders)
    for (const variation of variations) {
      for (const ext of extensions) {
        const matchingFiles = availableFiles.filter(file => {
          const fileName = file.split('/').pop() || ''; // Get filename without path
          return fileName === `${variation}${ext}`;
        });
        
        if (matchingFiles.length > 0) {
          const logoUrl = await getLogoUrl(matchingFiles[0]);
          logoCache.set(companyName, logoUrl);
          return logoUrl;
        }
      }
    }

    // Try partial matches (case insensitive, including folder paths)
    for (const variation of variations) {
      const matchingFile = availableFiles.find(file => {
        const fileName = file.split('/').pop()?.toLowerCase().replace(/\.[^/.]+$/, '') || '';
        const fileNameFull = file.toLowerCase();
        return fileNameFull.includes(variation.toLowerCase()) ||
               fileName.includes(variation.toLowerCase()) ||
               variation.toLowerCase().includes(fileName);
      });
      
      if (matchingFile) {
        const logoUrl = await getLogoUrl(matchingFile);
        logoCache.set(companyName, logoUrl);
        return logoUrl;
      }
    }

    // Log for debugging with sample of available files
    const sampleFiles = availableFiles.slice(0, 5).map(f => f.split('/').pop()).join(', ');
    console.info(`No logo found for: ${companyName}`, {
      variations: variations.slice(0, 3),
      sampleFiles: sampleFiles + (availableFiles.length > 5 ? '...' : '')
    });
    
    return null;
  } catch (error) {
    console.error(`Error finding logo for ${companyName}:`, error);
    return null;
  }
};

/**
 * Preloads logos for a list of companies
 */
export const preloadLogos = async (companies: string[]): Promise<Map<string, string | null>> => {
  const logoMap = new Map<string, string | null>();
  
  const promises = companies.map(async (company) => {
    const logoUrl = await findLogoForCompany(company);
    logoMap.set(company, logoUrl);
    return { company, logoUrl };
  });

  await Promise.all(promises);
  return logoMap;
};