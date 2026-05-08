/**
 * Folder - editorial adaptation of the React Bits "Folder" component.
 *
 * Differences from the upstream:
 *   - TypeScript + named props
 *   - Up to 5 papers (sponsor projects use exactly 5); CSS positions papers
 *     1..5 around the folder when open
 *   - Brand-aligned defaults (Deep Blue folder, paper-tone documents)
 *   - Keyboard accessible (Enter / Space toggles open)
 */
import { useState, KeyboardEvent, MouseEvent, ReactNode, CSSProperties } from "react";
import "./Folder.css";

const MAX_ITEMS = 5;

const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

interface FolderProps {
  /** Folder cover colour. Defaults to Deep Blue (#1A3D5C). */
  color?: string;
  /** Paper background colour. Defaults to Paper (#FDFCFB). */
  paperColor?: string;
  /** Scale multiplier for the whole folder. Defaults to 1. */
  size?: number;
  /** Up to 5 elements rendered as documents inside the folder. */
  items?: ReactNode[];
  /** Optional className applied to the outer scaled wrapper. */
  className?: string;
  /** Accessible label for the folder toggle. */
  ariaLabel?: string;
}

const Folder = ({
  color = "#1A3D5C",
  paperColor = "#FDFCFB",
  size = 1,
  items = [],
  className = "",
  ariaLabel = "Open folder",
}: FolderProps) => {
  const papers: (ReactNode | null)[] = items.slice(0, MAX_ITEMS);
  while (papers.length < MAX_ITEMS) papers.push(null);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.12);
  const paper1 = darkenColor(paperColor, 0.06);
  const paper2 = darkenColor(paperColor, 0.03);
  const paper3 = paperColor;

  const toggle = () => {
    setOpen((prev) => {
      if (prev) {
        setPaperOffsets(Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 })));
      }
      return !prev;
    });
  };

  const handlePaperMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.12;
    const offsetY = (e.clientY - centerY) * 0.12;
    setPaperOffsets((prev) => {
      const next = [...prev];
      next[index] = { x: offsetX, y: offsetY };
      return next;
    });
  };

  const handlePaperMouseLeave = (_e: MouseEvent<HTMLDivElement>, index: number) => {
    setPaperOffsets((prev) => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as CSSProperties;

  const folderClassName = `folder ${open ? "open" : ""}`.trim();
  const scaleStyle: CSSProperties = { transform: `scale(${size})`, transformOrigin: "center" };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={(e) => handlePaperMouseMove(e, i)}
              onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
              onClick={(e) => {
                // Prevent paper click from collapsing the folder when open.
                if (open) e.stopPropagation();
              }}
              style={
                open
                  ? ({
                      "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
                      "--magnet-y": `${paperOffsets[i]?.y || 0}px`,
                    } as CSSProperties)
                  : undefined
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
