#!/usr/bin/env node
/**
 * Build-time OG card generator.
 *
 * Reads content/og-cards.json, renders each entry as a 1200x630 PNG using
 * satori + resvg, writes to public/og/{slug}.png.
 *
 * Design mirrors the existing BB OG style (og-about.png, og-insights.png):
 * - Flat dark near-black background
 * - Playfair Display centred headline in near-white
 * - Thin Copper horizontal rule
 * - Copper subline in Inter
 *
 * To publish a new article, add a row to content/og-cards.json. That is it.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'og');
const DATA_FILE = path.join(ROOT, 'content', 'og-cards.json');

// Brand tokens (mirrors src/index.css and BB Brand Guide v1.0)
const BG = '#0F1420';
const HEADLINE_COLOR = '#F5F5F0';
const COPPER = '#C0946D';
const SUBLINE_COLOR = '#C0946D';
const WORDMARK = 'Bombay Breed';

// Font files (installed via @fontsource/* packages)
function loadFont(pkg, filename) {
  const p = path.join(ROOT, 'node_modules', pkg, 'files', filename);
  if (!fs.existsSync(p)) {
    throw new Error(`Font file missing: ${p}. Did npm install run?`);
  }
  return fs.readFileSync(p);
}

const playfairRegular = loadFont('@fontsource/playfair-display', 'playfair-display-latin-400-normal.woff');
const interRegular = loadFont('@fontsource/inter', 'inter-latin-400-normal.woff');
const interSemibold = loadFont('@fontsource/inter', 'inter-latin-600-normal.woff');

function template(card) {
  const { title, series, articleNumber, totalArticles } = card;
  const subline = `${series}  ·  Article ${articleNumber} of ${totalArticles}  ·  ${WORDMARK}`;
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Playfair Display',
              fontSize: '64px',
              lineHeight: 1.15,
              color: HEADLINE_COLOR,
              textAlign: 'center',
              maxWidth: '1040px',
              letterSpacing: '-1.6px',
              display: 'flex',
            },
            children: title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: '40px',
              marginBottom: '32px',
              width: '360px',
              height: '2px',
              background: COPPER,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Inter',
              fontSize: '22px',
              fontWeight: 600,
              color: SUBLINE_COLOR,
              textAlign: 'center',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'flex',
            },
            children: subline,
          },
        },
      ],
    },
  };
}

async function renderCard(card) {
  const svg = await satori(template(card), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Playfair Display', data: playfairRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: interSemibold, weight: 600, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, {
    background: BG,
    fitTo: { mode: 'width', value: 1200 },
  })
    .render()
    .asPng();
  return png;
}

async function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.log(`[build-og-cards] no data file at ${DATA_FILE}, skipping`);
    return;
  }
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const cards = Array.isArray(raw.cards) ? raw.cards : [];
  if (!cards.length) {
    console.log('[build-og-cards] no cards in JSON, skipping');
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const card of cards) {
    if (!card.slug || !card.title) {
      console.warn('[build-og-cards] skipping card missing slug or title:', card);
      continue;
    }
    const outPath = path.join(OUT_DIR, `${card.slug}.png`);
    try {
      const png = await renderCard(card);
      fs.writeFileSync(outPath, png);
      const kb = (png.length / 1024).toFixed(1);
      console.log(`[build-og-cards] wrote ${outPath} (${kb} KB)`);
    } catch (err) {
      console.error(`[build-og-cards] failed for slug=${card.slug}:`, err.message);
      throw err;
    }
  }
}

main().catch((err) => {
  console.error('[build-og-cards] fatal:', err);
  process.exit(1);
});
