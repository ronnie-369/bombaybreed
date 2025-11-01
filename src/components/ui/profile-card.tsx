import React from 'react';
import { Card } from './card';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      avatarUrl,
      name,
      title,
      handle,
      status,
      contactText = 'Contact',
      onContactClick,
      className,
      gradientFrom = 'from-emerald-500/20',
      gradientTo = 'to-purple-500/20',
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('relative group', className)}>
        {/* Background gradient glow effect */}
        <div
          className={cn(
            'absolute -inset-0.5 bg-gradient-to-r opacity-75 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl rounded-2xl',
            gradientFrom,
            gradientTo
          )}
        />

        <Card className="relative overflow-hidden border-0 bg-card/95 backdrop-blur-sm">
          {/* Header gradient background */}
          <div
            className={cn(
              'h-32 bg-gradient-to-br',
              gradientFrom,
              gradientTo
            )}
          />

          {/* Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full blur-sm opacity-75" />
                <img
                  src={avatarUrl}
                  alt={name}
                  className="relative w-28 h-28 rounded-full border-4 border-background object-cover"
                />
              </div>
            </div>

            {/* User info */}
            <div className="text-center space-y-2 mb-4">
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
              
              {handle && (
                <p className="text-sm text-foreground/60">@{handle}</p>
              )}
              
              {status && (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">{status}</span>
                </div>
              )}
            </div>

            {/* Contact button */}
            {onContactClick && (
              <Button
                onClick={onContactClick}
                className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white border-0"
              >
                {contactText}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }
);

ProfileCard.displayName = 'ProfileCard';

export { ProfileCard };
