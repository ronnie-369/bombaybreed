import { ReactNode } from "react";

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="text-[11px] font-semibold uppercase tracking-[0.36em] text-bb-copper">
    {children}
  </div>
);

export default SectionLabel;
