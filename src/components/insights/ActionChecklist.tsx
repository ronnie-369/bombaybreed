import React from 'react';

interface ActionChecklistProps {
  items: string[];
}

const ActionChecklist: React.FC<ActionChecklistProps> = ({ items }) => {
  return (
    <div className="bg-primary/5 rounded-lg p-8 my-12 max-w-[680px] mx-auto">
      <h3 className="text-base font-semibold text-foreground mb-4">Action Required</h3>
      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] text-foreground leading-relaxed">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ActionChecklist;
