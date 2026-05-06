import { Link } from "react-router-dom";

/**
 * Embedded membership callout for the /insights page.
 * Replaced the inline 5-column ladder strip with a concise call-out
 * that routes visitors to the dedicated comparison page.
 */

const LadderHero = () => {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
              Membership
            </p>
            <h2 className="mt-2 text-section font-serif tracking-tight">
              All of us, for all of us.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Five plans - from Substack readers to research underwriters. See what each tier delivers and pick the one that fits.
            </p>
          </div>
          <Link
            to="/intelligence/value-ladder"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Compare all five plans →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LadderHero;
