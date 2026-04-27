import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Home, ArrowLeft, FileWarning, ExternalLink, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Known static reports under /special-features/. If the user lands on a 404 for one
// of these, it almost always means the static file did not get included in the
// published deployment snapshot - the SPA catch-all served this page instead.
const KNOWN_STATIC_REPORTS: Record<string, { title: string; blurb: string }> = {
  "tcd-hp-investor-synthesis.html": {
    title: "Mitigation and Adaptation, Working as One — Himachal Pradesh",
    blurb: "Flagship investor synthesis with four supporting briefs.",
  },
  "tcd-hp-produce-map.html": {
    title: "What Himachal Grows — A Full Map of the Produce Economy",
    blurb: "Sub-brief to the Himachal Pradesh investor synthesis.",
  },
  "tcd-hp-crop-hardiness.html": {
    title: "When the Climate Outgrows the Crop",
    blurb: "Crop hardiness sub-brief to the Himachal Pradesh synthesis.",
  },
  "tcd-hp-compounding-losses.html": {
    title: "The Compounding Losses — Sea Buckthorn, GI-Tagged Produce, Tourism",
    blurb: "Sub-brief to the Himachal Pradesh investor synthesis.",
  },
  "tcd-vanishing-winter.html": {
    title: "The Vanishing Winter — Manali and the Himalayan Snow Deficit",
    blurb: "Sub-brief to the Himachal Pradesh investor synthesis.",
  },
  "india-ndc3.html": {
    title: "India NDC 3.0 — What India Promised the World",
    blurb: "Standalone special analysis.",
  },
  "war-climate.html": {
    title: "War & Climate — The One Emitter the Paris Agreement Forgot to Name",
    blurb: "Standalone investigation.",
  },
};

// A path is considered a "static asset" if it lives under /special-features/
// or ends in a known file extension. These should never be served by the SPA
// catch-all - if they hit this 404 page it means the file is missing from the
// current published deployment snapshot.
function detectStaticAsset(pathname: string) {
  const specialFeatureMatch = pathname.match(/^\/special-features\/([^/]+\.[a-z0-9]+)$/i);
  if (specialFeatureMatch) {
    return { kind: "special-feature" as const, file: specialFeatureMatch[1] };
  }
  const fileExtMatch = pathname.match(/\.(html?|pdf|json|xml|txt|csv|svg|png|jpg|jpeg|webp|gif)$/i);
  if (fileExtMatch) {
    const file = pathname.split("/").pop() ?? pathname;
    return { kind: "static-file" as const, file };
  }
  return null;
}

const NotFound = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Detect any missing static asset, with extra metadata for /special-features/.
  const staticAsset = useMemo(() => {
    const detected = detectStaticAsset(location.pathname);
    if (!detected) return null;

    const directPath = location.pathname;
    const absoluteUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${directPath}`
        : directPath;

    const meta =
      detected.kind === "special-feature"
        ? KNOWN_STATIC_REPORTS[detected.file] ?? null
        : null;

    return { ...detected, directPath, absoluteUrl, meta };
  }, [location.pathname]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    if (staticAsset) {
      console.error(
        "404 Error: missing static asset →",
        staticAsset.absoluteUrl
      );
    }

    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    document.head.appendChild(metaRobots);

    document.title = staticAsset
      ? `Static asset not found - 404 | Bombay Breed`
      : "Page Not Found - 404 | Bombay Breed";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "The page you are looking for does not exist or has been moved."
    );

    return () => {
      if (metaRobots.parentNode) document.head.removeChild(metaRobots);
    };
  }, [location.pathname, staticAsset]);

  // Reset the "copied!" indicator after a short delay.
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copyUrl = async (url: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      // Clipboard might be blocked in some preview contexts; fail quietly.
    }
  };

  // ---------------------------------------------------------------------------
  // Specialised view: missing static asset (with deeper guidance for known
  // /special-features/ reports).
  // ---------------------------------------------------------------------------
  if (staticAsset) {
    const { file, directPath, absoluteUrl, meta, kind } = staticAsset;
    const isSpecialFeature = kind === "special-feature";

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6 text-muted-foreground">
            <FileWarning className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.18em] font-medium">
              {isSpecialFeature ? "Static report not found" : "Static asset not found"}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-5 leading-[1.1]">
            {meta?.title ?? (isSpecialFeature ? "Report not yet deployed" : "File not yet deployed")}
          </h1>

          <p className="text-base text-muted-foreground mb-2 leading-relaxed">
            We tried to load:
          </p>

          {/* Exact missing URL - prominent, copyable, selectable */}
          <div className="mb-3 rounded-md border border-border bg-secondary/40 px-4 py-3 flex items-start gap-3">
            <code
              className="flex-1 text-sm md:text-[15px] text-foreground break-all font-mono leading-relaxed select-all"
              data-testid="missing-url"
            >
              {absoluteUrl}
            </code>
            <button
              type="button"
              onClick={() => copyUrl(absoluteUrl)}
              className="shrink-0 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border/60 hover:border-border bg-background"
              aria-label={copied ? "Copied" : "Copy URL"}
              title={copied ? "Copied" : "Copy URL"}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-primary" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-muted-foreground/70 mb-6 font-mono break-all">
            <span className="uppercase tracking-wider mr-2">Path</span>
            {directPath}
          </p>

          {meta?.blurb && (
            <p className="text-sm text-muted-foreground/80 mb-8 italic">
              {meta.blurb}
            </p>
          )}

          {/* PRIMARY action - open the static file directly. Native <a> +
              target="_blank" guarantees the browser hits the hosting layer
              and bypasses the React Router catch-all. */}
          <div className="mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={directPath}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="open-direct-link"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open {file} directly
              </a>
            </Button>
            <p className="text-xs text-muted-foreground/70 mt-2">
              Opens the static file in a new tab, bypassing the SPA router.
            </p>
          </div>

          <div className="border-l-2 border-primary/40 pl-5 py-1 mb-8 space-y-3">
            <p className="text-sm text-foreground font-medium">
              Most common cause
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The file exists in the project source but has not yet been
              included in the latest published deployment snapshot. Static
              assets under{" "}
              <code className="text-xs">/public/special-features/</code> only
              become reachable after the next{" "}
              <span className="text-foreground font-medium">Publish → Update</span>.
              Until then, the SPA catch-all serves this 404 page in its place.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Try these in order
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-mono shrink-0">01</span>
                <span>
                  In the Lovable editor, click{" "}
                  <span className="text-foreground font-medium">Publish → Update</span>{" "}
                  (top right) to push the latest static assets to the live site.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono shrink-0">02</span>
                <span>
                  Wait ~30 seconds, then{" "}
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    reload this page
                  </button>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono shrink-0">03</span>
                <span>
                  Or use the{" "}
                  <span className="text-foreground font-medium">Open directly</span>{" "}
                  button above to bypass the SPA cache entirely.
                </span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload this page
            </Button>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Default 404 view
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or navigate back to our homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            onClick={() => window.history.back()}
          >
            <span className="cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
