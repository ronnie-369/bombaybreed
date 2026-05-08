import { useRef, type HTMLAttributes, type ReactNode } from "react";
import "./SpotlightCard.css";

/**
 * SpotlightCard - cursor-tracked radial gradient overlay used to highlight
 * key cards and buttons. Wraps children without overriding their styling,
 * so it can be dropped around any existing card / button container.
 *
 * Usage:
 *   <SpotlightCard spotlightColor="rgba(197,160,89,0.2)" className="...">
 *     ...existing card markup...
 *   </SpotlightCard>
 */
export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** rgba/hsla string - opacity controls intensity. Defaults to brand gold. */
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(197, 160, 89, 0.18)",
  onMouseMove,
  style,
  ...rest
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = divRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      style={{ ...style, ["--spotlight-color" as string]: spotlightColor }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
