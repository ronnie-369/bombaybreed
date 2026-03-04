import React from 'react';
import { Link } from 'react-router-dom';
import theresaPortrait from '@/assets/theresa-portrait.jpg';

const AuthorBox: React.FC = () => {
  return (
    <section className="py-10 px-6 md:px-8 border-t border-border">
      <div className="container mx-auto max-w-[680px]">
        <div className="flex items-start gap-4">
          <img
            src={theresaPortrait}
            alt="Theresa Ronnie, Strategic Carbon Communications Advisor"
            className="w-14 h-14 rounded-full object-cover grayscale saturate-[0.85] flex-shrink-0"
          />
          <div>
            <h3 className="text-base font-semibold text-foreground">Theresa Ronnie</h3>
            <p className="text-sm text-muted-foreground">Strategic Carbon Communications Advisor</p>
            <p className="text-sm text-muted-foreground/80 mt-1">
              Advising Indian boards and CXOs on climate strategy, carbon market positioning, and sustainability communications.
            </p>
            <Link to="/about" className="text-sm text-primary hover:underline mt-1 inline-block">
              View full profile →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBox;
