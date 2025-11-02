import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Dialog, DialogContent } from './dialog';

interface VideoPlayerProps {
  videoId: string;
  provider?: 'youtube' | 'vimeo';
  thumbnail?: string;
  title?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  autoplay?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  provider = 'youtube',
  thumbnail,
  title = 'Video',
  aspectRatio = '16/9',
  autoplay = false,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getEmbedUrl = () => {
    if (provider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}`;
  };

  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    if (provider === 'youtube') {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return thumbnail;
  };

  return (
    <>
      <div 
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-xl",
          className
        )}
        style={{ aspectRatio }}
        onClick={() => setModalOpen(true)}
      >
        {!isPlaying && (
          <>
            <img
              src={getThumbnailUrl()}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-primary hover:scale-110 transition-all duration-300 shadow-2xl"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-lg drop-shadow-lg">
                {title}
              </p>
            </div>
          </>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-0">
          <div className="relative" style={{ aspectRatio }}>
            <iframe
              src={getEmbedUrl()}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
