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

const NotFound = () => {
  const location = useLocation();

  // Detect a missing /special-features/<file>.html and pull metadata if known.
  const staticReport = useMemo(() => {
    const m = location.pathname.match(/^\/special-features\/([^/]+\.html)$/i);
    if (!m) return null;
    const file = m[1];
    return {
      file,
      directUrl: `/special-features/${file}`,
      meta: KNOWN_STATIC_REPORTS[file] ?? null,
    };
  }, [location.pathname]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow";
    document.head.appendChild(metaRobots);

    document.title = staticReport
      ? `Report not yet deployed - 404 | Bombay Breed`
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
  }, [location.pathname, staticReport]);

  // ---------------------------------------------------------------------------
  // Specialised view: missing static report under /special-features/
  // ---------------------------------------------------------------------------
  if (staticReport) {
    const { file, directUrl, meta } = staticReport;
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6 text-muted-foreground">
            <FileWarning className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.18em] font-medium">
              Static report not found
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-5 leading-[1.1]">
            {meta?.title ?? "Report not yet deployed"}
          </h1>

          <p className="text-base text-muted-foreground mb-2 leading-relaxed">
            We could not load the static report at{" "}
            <code className="text-foreground bg-secondary/40 px-1.5 py-0.5 rounded text-sm">
              {directUrl}
            </code>
            .
          </p>

          {meta?.blurb && (
            <p className="text-sm text-muted-foreground/80 mb-8 italic">
              {meta.blurb}
            </p>
          )}

          <div className="border-l-2 border-primary/40 pl-5 py-1 mb-8 space-y-3">
            <p className="text-sm text-foreground font-medium">
              Most common cause
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The HTML file exists in the project source but has not yet been
              included in the latest published deployment snapshot. Static assets
              under <code className="text-xs">/public/special-features/</code>{" "}
              only become reachable after the next{" "}
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
                  Or open the file directly in a new tab to bypass the SPA cache:
                </span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button asChild variant="default">
              <a href={directUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open {file} directly
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload
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
