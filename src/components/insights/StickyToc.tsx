import React, { useState, useEffect } from 'react';

interface StickyTocProps {
  items: { id: string; title: string }[];
}

const StickyToc: React.FC<StickyTocProps> = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-140px 0px -60% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (items.length < 3) return null;

  return (
    <nav className="hidden lg:block w-[200px] flex-shrink-0">
      <div className="sticky top-[140px]">
        <ul className="space-y-2">
          {items.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`text-left text-sm leading-snug transition-colors w-full ${
                  activeId === id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default StickyToc;
