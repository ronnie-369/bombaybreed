import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
        // Try common video file names
        const possibleNames = ['pounces for ball.mp4', 'pounces for ball.webm'];
        
        for (const fileName of possibleNames) {
          const { data, error } = await supabase.storage
            .from('brand assets')
            .createSignedUrl(fileName, 3600); // 1 hour expiry

          if (data?.signedUrl && !error) {
            setVideoUrl(data.signedUrl);
            return;
          }
        }

        // If specific files not found, list bucket contents
        const { data: files } = await supabase.storage
          .from('brand assets')
          .list();

        if (files) {
          const videoFile = files.find(file => 
            file.name.toLowerCase().includes('pounces') && 
            /\.(mp4|webm|mov|m4v)$/i.test(file.name)
          );

          if (videoFile) {
            const { data } = await supabase.storage
              .from('brand assets')
              .createSignedUrl(videoFile.name, 3600);

            if (data?.signedUrl) {
              setVideoUrl(data.signedUrl);
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
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <video
      src={videoUrl}
      className={className}
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