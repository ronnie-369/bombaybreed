import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

interface Props {
  children: ReactNode;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[14px] font-medium tracking-tight transition-colors ${
    isActive ? "text-bb-slate" : "text-bb-gray hover:text-bb-near-black"
  }`;

const IntelligenceLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/intelligence");
  };

  return (
    <div className="min-h-screen bg-bb-off-white text-bb-near-black font-sans antialiased">
      <header className="border-b border-bb-border bg-bb-off-white/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/intelligence" className="flex items-baseline gap-3">
            <span className="font-serif text-[20px] tracking-tight text-bb-near-black">
              TCD Intelligence
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-bb-gray">
              by Bombay Breed
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-[14px] font-medium tracking-tight text-bb-gray hover:text-bb-near-black inline-flex items-center gap-1"
              aria-label="Back to Bombay Breed home"
            >
              <span aria-hidden>←</span> Home
            </Link>
            <NavLink to="/intelligence" end className={navLinkClass}>
              Overview
            </NavLink>
            <NavLink to="/intelligence/membership" className={navLinkClass}>
              Membership
            </NavLink>
            {session && (
              <NavLink to="/intelligence/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link
                  to="/intelligence/account"
                  className="hidden sm:inline text-[14px] font-medium text-bb-gray hover:text-bb-near-black"
                >
                  Account
                </Link>
                <button
                  onClick={signOut}
                  className="text-[14px] font-medium text-bb-gray hover:text-bb-near-black"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/intelligence/signup"
                  className="hidden sm:inline text-[14px] font-medium text-bb-gray hover:text-bb-near-black"
                >
                  Sign in
                </Link>
                <Link
                  to="/intelligence/membership"
                  className="px-4 py-2 rounded-[10px] bg-bb-slate text-bb-off-white text-[14px] font-medium hover:opacity-90 transition"
                >
                  Become a member
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-bb-border mt-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-serif text-[18px] tracking-tight text-bb-near-black">
              TCD Intelligence
            </div>
            <p className="text-[13px] text-bb-gray mt-1 max-w-md">
              Subscription intelligence on India climate policy, capital formation, and corporate
              disclosure. Published by Bombay Breed.
            </p>
          </div>
          <div className="text-[12px] text-bb-gray">
            <a href="/" className="hover:text-bb-near-black">bombaybreed.com</a>
            <span className="mx-3">·</span>
            <Link to="/privacy-policy" className="hover:text-bb-near-black">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntelligenceLayout;
