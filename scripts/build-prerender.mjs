#!/usr/bin/env node
/**
 * Prerender step. Runs after `vite build`.
 *
 * Problem this solves: crawlers (LinkedIn, Facebook, Twitter, Slack, WhatsApp)
 * do not run JavaScript. In an SPA, React Helmet updates meta tags client-side,
 * so crawlers always see the default meta from index.html no matter which URL
 * they fetch. That means every article shared on LinkedIn shows the homepage
 * OG card.
 *
 * Fix: for every article in content/og-cards.json, copy dist/index.html to
 * dist/{path}/index.html and replace title, description, og:*, twitter:* tags
 * with the article's values. Browsers still get the React SPA because the same
 * bundle loads. Crawlers get the correct meta because they only read the HTML.
 *
 * Publishing a new article: add one row to content/og-cards.json. That is it.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DATA_FILE = path.join(ROOT, 'content', 'og-cards.json');
const SITE = 'https://bombaybreed.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replaceMeta(html, card) {
  const title = escapeHtml(card.pageTitle || card.title);
  const desc = escapeHtml(card.description);
  const url = `${SITE}${card.path}`;
  const image = `${SITE}/og/${card.slug}.png`;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace or set common meta tags. Each replacement matches property/name attribute.
  const patterns = [
    ['name="description"', desc],
    ['property="og:title"', title],
    ['property="og:description"', desc],
    ['property="og:url"', url],
    ['property="og:image"', image],
    ['name="twitter:title"', title],
    ['name="twitter:description"', desc],
    ['name="twitter:image"', image],
  ];

  for (const [attr, value] of patterns) {
    const re = new RegExp(`(<meta\\s+${attr.replace(/"/g, '"')}\\s+content=")[^"]*(")`);
    if (re.test(html)) {
      html = html.replace(re, `$1${value}$2`);
    } else {
      // If missing, insert before </head>
      const inject = `    <meta ${attr} content="${value}" />\n  `;
      html = html.replace('</head>', `${inject}</head>`);
    }
  }

  // Ensure og:type is article for these routes
  const ogTypeRe = /(<meta\s+property="og:type"\s+content=")[^"]*(")/;
  if (ogTypeRe.test(html)) {
    html = html.replace(ogTypeRe, '$1article$2');
  }

  return html;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('[build-prerender] dist/ does not exist. Run vite build first.');
    process.exit(1);
  }
  if (!fs.existsSync(DATA_FILE)) {
    console.log('[build-prerender] no data file, skipping');
    return;
  }
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const cards = Array.isArray(raw.cards) ? raw.cards : [];
  if (!cards.length) {
    console.log('[build-prerender] no cards to prerender');
    return;
  }
  const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  for (const card of cards) {
    if (!card.path || !card.slug) {
      console.warn('[build-prerender] skipping card missing path or slug:', card);
      continue;
    }
    const rendered = replaceMeta(indexHtml, card);
    const outDir = path.join(DIST, card.path);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'index.html');
    fs.writeFileSync(outPath, rendered);
    console.log(`[build-prerender] wrote ${outPath}`);
  }
}

main();
