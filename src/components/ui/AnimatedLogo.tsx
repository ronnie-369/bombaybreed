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
        // List all files in brand assets bucket
        const { data: files } = await supabase.storage
          .from('brand assets')
          .list();

        if (files) {
          // Prioritize WebM files (especially with alpha) then MP4
          const videoFiles = files.filter(file => 
            (file.name.toLowerCase().includes('pounce') || file.name.toLowerCase().includes('logo')) && 
            /\.(webm|mp4|mov|m4v)$/i.test(file.name)
          );

          // Sort by preference: WebM first (for transparency), then MP4
          videoFiles.sort((a, b) => {
            const aIsWebM = a.name.toLowerCase().endsWith('.webm');
            const bIsWebM = b.name.toLowerCase().endsWith('.webm');
            
            if (aIsWebM && !bIsWebM) return -1;
            if (!aIsWebM && bIsWebM) return 1;
            return 0;
          });

          // Try each video file until one works
          for (const videoFile of videoFiles) {
            const { data, error } = await supabase.storage
              .from('brand assets')
              .createSignedUrl(videoFile.name, 3600); // 1 hour expiry

            if (data?.signedUrl && !error) {
              setVideoUrl(data.signedUrl);
              return;
            }
          }
        }
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