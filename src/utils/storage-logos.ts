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
 * Fetches available logos from Supabase storage
 */
export const fetchAvailableLogos = async (): Promise<string[]> => {
  try {
    const { data: files, error } = await supabase.storage
      .from('brand assets')
      .list('', {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error fetching logos:', error);
      return [];
    }

    return files?.map(file => file.name) || [];
  } catch (error) {
    console.error('Error fetching available logos:', error);
    return [];
  }
};

/**
 * Gets the public URL for a logo file
 */
export const getLogoUrl = (filename: string): string => {
  const { data } = supabase.storage
    .from('brand assets')
    .getPublicUrl(filename);
  
  return data.publicUrl;
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
    
    // Try to find matching files
    for (const variation of variations) {
      for (const ext of extensions) {
        const filename = `${variation}${ext}`;
        if (availableFiles.includes(filename)) {
          const logoUrl = getLogoUrl(filename);
          logoCache.set(companyName, logoUrl);
          return logoUrl;
        }
      }
    }

    // Try partial matches (case insensitive)
    for (const variation of variations) {
      const matchingFile = availableFiles.find(file => 
        file.toLowerCase().includes(variation.toLowerCase()) ||
        variation.toLowerCase().includes(file.toLowerCase().replace(/\.[^/.]+$/, ''))
      );
      
      if (matchingFile) {
        const logoUrl = getLogoUrl(matchingFile);
        logoCache.set(companyName, logoUrl);
        return logoUrl;
      }
    }

    console.log(`No logo found for: ${companyName}, tried variations:`, variations);
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