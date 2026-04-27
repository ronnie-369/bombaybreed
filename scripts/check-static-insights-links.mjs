#!/usr/bin/env node
/**
 * Automated post-publish check for the Insights hub.
 *
 * For every entry in src/pages/Insights.tsx whose `link` points at a static
 * asset (anything under /special-features/, or ending in .html / .pdf, or
 * flagged `external: true`), this script:
 *
 *   1. Fetches the URL on the target environment (preview / published / custom).
 *   2. Asserts HTTP 200.
 *   3. Asserts the response body is the actual static file - not the React
 *      SPA shell served via Lovable's SPA fallback. The SPA shell always
 *      contains `<div id="root"></div>`; none of our static reports do.
 *
 * It also scans public/special-features/*.html for any standalone files
 * that are NOT linked from Insights.tsx, and verifies those too (so newly
 * added sub-briefs get covered automatically).
 *
 * Finally it hits /insights itself to confirm the React entry loads.
 *
 * Usage:
 *   node scripts/check-static-insights-links.mjs              # published site
 *   node scripts/check-static-insights-links.mjs --preview    # preview env
 *   node scripts/check-static-insights-links.mjs --custom     # custom domain
 *   node scripts/check-static-insights-links.mjs --base=https://example.com
 *   node scripts/check-static-insights-links.mjs --json       # machine output
 *
 * Exits 0 if everything is green, 1 otherwise. Suitable for a CI / post-
 * publish hook.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ────────────────────────────────────────────────────────────
// Environment resolution
// ────────────────────────────────────────────────────────────
const PUBLISHED_BASE = 'https://bombaybreed.lovable.app';
const PREVIEW_BASE   = 'https://id-preview--5955eacd-3e3f-43a9-8f9e-083589abc0bd.lovable.app';
const CUSTOM_DOMAIN  = 'https://bombaybreed.com';

const args = process.argv.slice(2);
const wantsJson = args.includes('--json');
let base = PUBLISHED_BASE;
let label = 'published';
if (args.includes('--preview')) { base = PREVIEW_BASE;  label = 'preview'; }
if (args.includes('--custom'))  { base = CUSTOM_DOMAIN; label = 'custom-domain'; }
const baseArg = args.find(a => a.startsWith('--base='));
if (baseArg) {
  base = baseArg.slice('--base='.length).replace(/\/$/, '');
  label = 'custom';
}

// ────────────────────────────────────────────────────────────
// Discovery: pull every static-asset link from Insights.tsx
// ────────────────────────────────────────────────────────────
function isStaticAssetPath(link, external) {
  if (!link) return false;
  if (external) return true;
  if (link.startsWith('/special-features/')) return true;
  return /\.(html?|pdf)$/i.test(link);
}

function extractInsightsLinks() {
  const file = resolve(ROOT, 'src/pages/Insights.tsx');
  const src = readFileSync(file, 'utf8');

  // Cheap parser: find each {...} object inside the publications array and
  // pluck `link:` + `external:` from it. Good enough; Insights.tsx is a flat
  // literal array maintained by hand.
  const out = [];
  const objectRe = /\{[\s\S]*?\}/g;
  for (const match of src.match(objectRe) ?? []) {
    const linkMatch = match.match(/link:\s*["']([^"']+)["']/);
    if (!linkMatch) continue;
    const externalMatch = match.match(/external:\s*(true|false)/);
    const titleMatch = match.match(/title:\s*["']([^"']+)["']/);
    const link = linkMatch[1];
    const external = externalMatch ? externalMatch[1] === 'true' : false;
    if (isStaticAssetPath(link, external)) {
      out.push({
        path: link,
        title: titleMatch ? titleMatch[1] : null,
        source: 'insights.tsx',
      });
    }
  }
  return out;
}

function extractStandaloneStaticFiles() {
  const dir = resolve(ROOT, 'public/special-features');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .map(f => ({
      path: `/special-features/${f}`,
      title: null,
      source: 'public/special-features',
    }));
}

// Merge the two sources, dedupe on path. Mark the merged source.
function discoverStaticPaths() {
  const map = new Map();
  for (const item of extractInsightsLinks()) {
    map.set(item.path, { ...item });
  }
  for (const item of extractStandaloneStaticFiles()) {
    if (map.has(item.path)) {
      map.get(item.path).source = 'insights.tsx + filesystem';
    } else {
      map.set(item.path, item);
    }
  }
  return [...map.values()].sort((a, b) => a.path.localeCompare(b.path));
}

// ────────────────────────────────────────────────────────────
// HTTP check
// ────────────────────────────────────────────────────────────
const TIMEOUT_MS = 15_000;
const SPA_MARKERS = ['<div id="root">', 'id="root"></div>'];
// Lovable's auth bridge (Next.js shell shown when an unauthenticated user
// hits a private preview URL) - not our app, not the static file.
const AUTH_BRIDGE_MARKERS = [
  'lovable.dev/auth-bridge',
  'Lovable - Build for the web 20x faster',
  '/_next/static/chunks/',
];

async function checkOne({ path, kind, title }) {
  const url = base + path;
  const started = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'user-agent': 'bb-insights-link-check/1.0' },
    });
    const elapsed = Date.now() - started;
    const ct = res.headers.get('content-type') ?? '';
    // For PDFs we can stop at headers; reading the full body is wasteful.
    const isPdf = path.toLowerCase().endsWith('.pdf');
    const body = isPdf ? '' : await res.text();
    const length = isPdf ? Number(res.headers.get('content-length') ?? 0) : body.length;

    let ok = res.status === 200;
    let note = '';

    // Auth-bridge gate (private preview without a Lovable login).
    if (ok && !isPdf && AUTH_BRIDGE_MARKERS.some(m => body.includes(m))) {
      ok = false;
      note = 'Lovable auth-bridge returned (preview is private; cannot verify without a logged-in session). Run against published / custom domain instead.';
    }

    if (ok && kind === 'static-html') {
      const looksLikeSpa = SPA_MARKERS.some(m => body.includes(m));
      if (looksLikeSpa) {
        ok = false;
        note = 'SPA fallback served instead of static HTML (body contains <div id="root">). Likely the static file was not included in the latest publish.';
      }
    }
    if (ok && kind === 'static-pdf' && !ct.toLowerCase().includes('pdf')) {
      ok = false;
      note = `Expected application/pdf, got "${ct || 'unknown'}"`;
    }

    return { url, path, title, kind, status: res.status, ok, elapsed, note, length };
  } catch (err) {
    return {
      url, path, title, kind,
      status: 0, ok: false,
      elapsed: Date.now() - started,
      note: err.message, length: 0,
    };
  } finally {
    clearTimeout(timer);
  }
}

// ────────────────────────────────────────────────────────────
// Reporter
// ────────────────────────────────────────────────────────────
const colour = (code, s) => process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s;
const green  = s => colour(32, s);
const red    = s => colour(31, s);
const yellow = s => colour(33, s);
const dim    = s => colour(90, s);

(async () => {
  const discovered = discoverStaticPaths();

  const targets = [
    { path: '/insights', kind: 'spa', title: 'Insights hub (SPA entry)' },
    ...discovered.map(d => ({
      ...d,
      kind: d.path.toLowerCase().endsWith('.pdf') ? 'static-pdf' : 'static-html',
    })),
  ];

  if (!wantsJson) {
    console.log(`\nInsights link check  →  ${base}  ${dim('(' + label + ')')}`);
    console.log(dim(`  ${discovered.length} static asset(s) discovered + 1 SPA entry\n`));
    console.log(dim('  status   time     bytes    path'));
    console.log(dim('  ──────   ──────   ──────   ──────────────────────────────────────────'));
  }

  const results = await Promise.all(targets.map(checkOne));

  let failed = 0;
  for (const r of results) {
    if (!r.ok) failed++;
    if (wantsJson) continue;
    const statusTxt = r.status === 0 ? 'ERR' : String(r.status);
    const tag = r.ok ? green('  OK  ') : red(' FAIL ');
    const sizeTxt = r.length ? `${(r.length / 1024).toFixed(1)}KB` : '-';
    console.log(`${tag} ${statusTxt.padStart(4)}   ${String(r.elapsed + 'ms').padStart(6)}   ${sizeTxt.padStart(6)}   ${r.path}`);
    if (r.title) console.log(dim(`         ↳ ${r.title}`));
    if (r.note)  console.log(`         ${yellow('⚠ ' + r.note)}`);
  }

  if (wantsJson) {
    console.log(JSON.stringify({
      base, label,
      ok: failed === 0,
      total: results.length,
      failed,
      results,
    }, null, 2));
  } else {
    console.log('');
    if (failed === 0) {
      console.log(green(`✓ All ${results.length} URLs returned 200 OK and served real static content.\n`));
    } else {
      console.log(red(`✗ ${failed} of ${results.length} URLs failed. Re-publish (Publish → Update) and re-run.\n`));
    }
  }

  process.exit(failed === 0 ? 0 : 1);
})();
