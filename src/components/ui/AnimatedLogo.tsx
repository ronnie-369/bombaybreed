import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Logo from '@/components/ui/Logo';

interface AnimatedLogoProps {
  className?: string;
  alt: string;
  fallbackSrc?: string;
}

// Known video path to avoid recursive listing API calls
const KNOWN_VIDEO_PATH = 'pounce-logo.webm';

/**
 * Animated logo component that displays a video from Supabase storage
 * Falls back to static logo on error or when motion is reduced
 * Optimized: Uses direct path instead of recursive file listing
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
        // Try direct path first (no recursive listing needed)
        const { data: publicData } = supabase.storage
          .from('brand assets')
          .getPublicUrl(KNOWN_VIDEO_PATH);
          
        if (publicData?.publicUrl) {
          // Verify the URL is valid by checking headers
          try {
            const response = await fetch(publicData.publicUrl, { method: 'HEAD' });
            if (response.ok) {
              setVideoUrl(publicData.publicUrl);
              return;
            }
          } catch {
            // URL check failed, try signed URL
          }
        }

        // Try signed URL as fallback
        const { data, error } = await supabase.storage
          .from('brand assets')
          .createSignedUrl(KNOWN_VIDEO_PATH, 3600);

        if (data?.signedUrl && !error) {
          setVideoUrl(data.signedUrl);
          return;
        }

        // If direct path fails, do a simple single-level list
        const { data: files } = await supabase.storage
          .from('brand assets')
          .list('', { limit: 50 });

        if (files) {
          const videoFile = files.find(f => 
            /\.(webm|mp4)$/i.test(f.name) && 
            (f.name.toLowerCase().includes('pounce') || f.name.toLowerCase().includes('logo'))
          );

          if (videoFile) {
            const { data: videoData } = supabase.storage
              .from('brand assets')
              .getPublicUrl(videoFile.name);
              
            if (videoData?.publicUrl) {
              setVideoUrl(videoData.publicUrl);
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
