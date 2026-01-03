import React from 'react';

interface ContentLoaderProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

const ContentLoader = ({ isLoading, skeleton, children }: ContentLoaderProps) => {
  return (
    <div className="relative">
      {isLoading ? (
        <div className="animate-pulse">{skeleton}</div>
      ) : (
        <div className="animate-fade-in">{children}</div>
      )}
    </div>
  );
};

export default ContentLoader;
