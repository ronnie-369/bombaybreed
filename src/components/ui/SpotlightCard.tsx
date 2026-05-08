import { useRef, type HTMLAttributes, type ReactNode } from "react";
import "./SpotlightCard.css";

/**
 * SpotlightCard - cursor-tracked radial gradient overlay used to highlight
 * key cards and buttons. Wraps children without overriding their styling,
 * so it can drop around any existing card / button container.
 *
 * Tones are tuned for the Bombay Breed light, Apple-like editorial theme:
 * subtle gradients on a paper background, never neon. Use the lightest
 * `tone` that still reads on hover; reserve `gold-strong` for the single
 * featured / recommended card on a page.
 */

export type SpotlightTone =
  | "gold"          // Default. Warm gold #C5A059 at low opacity.
  | "gold-strong"   // Featured / recommended card emphasis.
  | "ink"           // Cool dark-ink wash for neutral cards on paper.
  | "blue"          // Deep editorial blue #1A3D5C - use sparingly.
  | "paper";        // Almost invisible warm wash for hero / quiet surfaces.

/**
 * Keyed to the brand palette in `mem://design/visual-identity-and-color-palette`.
 * Opacities stay <= 0.28 so the effect reads as a polished sheen, not a glow.
 */
export const SPOTLIGHT_TONES: Record<SpotlightTone, string> = {
  gold: "rgba(197, 160, 89, 0.16)",
  "gold-strong": "rgba(197, 160, 89, 0.26)",
  ink: "rgba(10, 10, 11, 0.08)",
  blue: "rgba(26, 61, 92, 0.14)",
  paper: "rgba(197, 160, 89, 0.10)",
};

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /**
   * Semantic tone preset. Maps to a brand-aware rgba via SPOTLIGHT_TONES.
   * Ignored when `spotlightColor` is provided. Default: `gold`.
   */
  tone?: SpotlightTone;
  /** Explicit override - any rgba/hsla string. Wins over `tone`. */
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  tone = "gold",
  spotlightColor,
  onMouseMove,
  style,
  ...rest
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const resolved = spotlightColor ?? SPOTLIGHT_TONES[tone];

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
      style={{ ...style, ["--spotlight-color" as string]: resolved }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
