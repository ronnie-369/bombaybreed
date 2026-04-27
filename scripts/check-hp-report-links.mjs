#!/usr/bin/env node
/**
 * Automated link check for the Himachal Pradesh Intelligence Report.
 *
 * Verifies that the React entry point (/insights) and every static-asset URL
 * for the flagship synthesis + the four sub-briefs respond 200 OK on the
 * targeted environment.
 *
 * Usage:
 *   node scripts/check-hp-report-links.mjs                 # checks published site
 *   node scripts/check-hp-report-links.mjs --preview       # checks preview
 *   node scripts/check-hp-report-links.mjs --base=https://example.com
 *
 * Exits non-zero if any URL returns a non-200 status, so you can plug it
 * into CI / a post-publish hook.
 */

const PUBLISHED_BASE = 'https://bombaybreed.lovable.app';
const PREVIEW_BASE   = 'https://id-preview--5955eacd-3e3f-43a9-8f9e-083589abc0bd.lovable.app';
const CUSTOM_DOMAIN  = 'https://bombaybreed.com';

// Resolve target base from CLI args.
const args = process.argv.slice(2);
let base = PUBLISHED_BASE;
if (args.includes('--preview')) base = PREVIEW_BASE;
if (args.includes('--custom'))  base = CUSTOM_DOMAIN;
const baseArg = args.find(a => a.startsWith('--base='));
if (baseArg) base = baseArg.slice('--base='.length).replace(/\/$/, '');

const PATHS = [
  // React entry point that lists the report.
  { path: '/insights', kind: 'spa' },

  // Flagship synthesis (static HTML).
  { path: '/special-features/tcd-hp-investor-synthesis.html', kind: 'static' },

  // Four sub-briefs (static HTML).
  { path: '/special-features/tcd-hp-produce-map.html',        kind: 'static' },
  { path: '/special-features/tcd-hp-crop-hardiness.html',     kind: 'static' },
  { path: '/special-features/tcd-hp-compounding-losses.html', kind: 'static' },
  { path: '/special-features/tcd-vanishing-winter.html',      kind: 'static' },
];

// Marker strings we expect to find in the body of each static HTML file.
// This catches the failure mode where the SPA fallback returns 200 + index.html
// instead of the real static file.
const STATIC_MARKERS = {
  '/special-features/tcd-hp-investor-synthesis.html': 'investment thesis, in five lines',
  '/special-features/tcd-hp-produce-map.html':        'A Full Map of the Produce Economy',
  '/special-features/tcd-hp-crop-hardiness.html':     'When the Climate Outgrows the Crop',
  '/special-features/tcd-hp-compounding-losses.html': 'Sea Buckthorn, GI-Tagged Produce',
  '/special-features/tcd-vanishing-winter.html':      'Manali and the Himalayan Snow Deficit',
};

const TIMEOUT_MS = 15_000;
const colour = (code, s) => process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s;
const green  = s => colour(32, s);
const red    = s => colour(31, s);
const yellow = s => colour(33, s);
const dim    = s => colour(90, s);

async function checkOne({ path, kind }) {
  const url = base + path;
  const started = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'user-agent': 'bb-hp-report-link-check/1.0' },
    });
    const elapsed = Date.now() - started;
    const body = await res.text();

    let ok = res.status === 200;
    let note = '';

    if (kind === 'static' && res.status === 200) {
      const marker = STATIC_MARKERS[path];
      if (marker && !body.includes(marker)) {
        ok = false;
        note = `200 but body missing marker "${marker.slice(0, 40)}…" (likely SPA fallback served instead of static file)`;
      }
    }

    return { url, status: res.status, ok, elapsed, note, length: body.length };
  } catch (err) {
    return { url, status: 0, ok: false, elapsed: Date.now() - started, note: err.message, length: 0 };
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  console.log(`\nHP Report link check  →  ${base}\n`);
  console.log(dim('  status   time     bytes   path'));
  console.log(dim('  ──────   ──────   ─────   ──────────────────────────────────────────'));

  const results = await Promise.all(PATHS.map(checkOne));

  let failed = 0;
  for (const r of results) {
    const path = new URL(r.url).pathname;
    const statusTxt = r.status === 0 ? 'ERR' : String(r.status);
    const tag = r.ok ? green('  OK  ') : red(' FAIL ');
    const sizeTxt = r.length ? `${(r.length / 1024).toFixed(1)}KB` : '-';
    console.log(`${tag} ${statusTxt.padStart(4)}   ${String(r.elapsed + 'ms').padStart(6)}   ${sizeTxt.padStart(6)}   ${path}`);
    if (r.note) console.log(`         ${yellow('↳ ' + r.note)}`);
    if (!r.ok) failed++;
  }

  console.log('');
  if (failed === 0) {
    console.log(green(`✓ All ${results.length} URLs returned 200 OK.\n`));
    process.exit(0);
  } else {
    console.log(red(`✗ ${failed} of ${results.length} URLs failed. See above.\n`));
    process.exit(1);
  }
})();
