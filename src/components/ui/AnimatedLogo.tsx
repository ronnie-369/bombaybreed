import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Logo from '@/components/ui/Logo';

interface AnimatedLogoProps {
  className?: string;
  alt: string;
  fallbackSrc?: string;
}

/**
 * Animated logo component that displays a video from Supabase storage
 * Falls back to static logo on error or when motion is reduced
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = "", 
  alt,
  fallbackSrc = "/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const loadVideo = async () => {
      if (prefersReducedMotion) return;

      try {
        // Recursive function to list all files in bucket
        const listAllFiles = async (prefix: string = '', depth: number = 0): Promise<string[]> => {
          if (depth > 3) return [];
          
          const { data: files, error } = await supabase.storage
            .from('brand assets')
            .list(prefix, { limit: 100 });

          if (error || !files) return [];

          const allFiles: string[] = [];
          for (const file of files) {
            const fullPath = prefix ? `${prefix}/${file.name}` : file.name;
            
            if (file.metadata === null) {
              // Folder - recurse
              const subFiles = await listAllFiles(fullPath, depth + 1);
              allFiles.push(...subFiles);
            } else {
              // File
              allFiles.push(fullPath);
            }
          }
          return allFiles;
        };

        const allFiles = await listAllFiles();
        
        if (allFiles.length === 0) {
          console.info('No files found in brand assets bucket');
          return;
        }

        // Filter for video files with broader keywords
        const videoFiles = allFiles.filter(file => {
          const filename = file.toLowerCase();
          const hasKeyword = filename.includes('pounce') || 
                           filename.includes('animated-logo') || 
                           filename.includes('logo');
          const hasExtension = /\.(webm|mp4|mov|m4v)$/i.test(file);
          return hasKeyword && hasExtension;
        });

        if (videoFiles.length === 0) {
          const sampleFiles = allFiles.slice(0, 5).join(', ');
          console.info('No animated logo candidates found. Sample files:', sampleFiles + (allFiles.length > 5 ? '...' : ''));
          return;
        }

        // Sort by preference: WebM first, then by keyword preference
        videoFiles.sort((a, b) => {
          const aExt = a.toLowerCase().split('.').pop() || '';
          const bExt = b.toLowerCase().split('.').pop() || '';
          const aName = a.toLowerCase();
          const bName = b.toLowerCase();
          
          // WebM files first
          if (aExt === 'webm' && bExt !== 'webm') return -1;
          if (aExt !== 'webm' && bExt === 'webm') return 1;
          
          // Then by keyword preference
          if (aName.includes('pounce') && !bName.includes('pounce')) return -1;
          if (!aName.includes('pounce') && bName.includes('pounce')) return 1;
          
          return 0;
        });

        // Try each video file until one works
        for (const videoFile of videoFiles) {
          try {
            const { data, error } = await supabase.storage
              .from('brand assets')
              .createSignedUrl(videoFile, 3600);

            if (data?.signedUrl && !error) {
              setVideoUrl(data.signedUrl);
              console.info('Loaded animated logo:', videoFile);
              return;
            }
          } catch (err) {
            // Try public URL as fallback
            const { data: publicData } = supabase.storage
              .from('brand assets')
              .getPublicUrl(videoFile);
              
            if (publicData?.publicUrl) {
              setVideoUrl(publicData.publicUrl);
              console.info('Loaded animated logo (public):', videoFile);
              return;
            }
          }
        }
        
        console.info('No working animated logo found from candidates:', videoFiles);
      } catch (error) {
        console.warn('Failed to load animated logo:', error);
        setHasError(true);
      }
    };

    loadVideo();
  }, [prefersReducedMotion]);

  // Use static logo if reduced motion is preferred, error occurred, or no video URL
  if (prefersReducedMotion || hasError || !videoUrl) {
    return (
      <Logo
        src={fallbackSrc}
        alt={alt}
        className={className}
        fallbackSrc={fallbackSrc}
      />
    );
  }

  return (
    <video
      src={videoUrl}
      className={`${className} bg-transparent`}
      style={{ backgroundColor: 'transparent' }}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      onError={() => setHasError(true)}
      aria-label={alt}
    />
  );
};

export default AnimatedLogo;