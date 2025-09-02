import React, { useState, useEffect } from 'react';
import { removeWhiteBackground } from '@/utils/imageProcessing';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Logo component that automatically removes white backgrounds for seamless blending
 */
const Logo: React.FC<LogoProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc 
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src);
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsProcessing(true);
        setHasError(false);
        const transparentSrc = await removeWhiteBackground(src);
        setProcessedSrc(transparentSrc);
      } catch (error) {
        console.warn('Failed to process logo background:', error);
        setHasError(true);
        // Use fallback or original image
        setProcessedSrc(fallbackSrc || src);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [src, fallbackSrc]);

  return (
    <div className={`relative ${className}`}>
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/10 rounded">
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      <img
        src={processedSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isProcessing ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setProcessedSrc(fallbackSrc || src);
          }
        }}
      />
    </div>
  );
};

export default Logo;