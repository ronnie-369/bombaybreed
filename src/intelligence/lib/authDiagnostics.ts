// Lightweight helper to log auth diagnostics and translate raw errors into
// actionable hints for users. Reads/writes to `tcd_auth_diagnostics` (admin-only
// SELECT, public INSERT) so admins can audit failures without exposing PII.

import { supabase } from "@/integrations/supabase/client";

export type AuthEvent =
  | "signup"
  | "resend"
  | "magic_link"
  | "signin_password"
  | "verify_email_link";

export type AuthHint = {
  title: string;
  description: string;
  // Severity drives the toast variant on the client.
  severity: "info" | "warning" | "error";
};

export const logAuthDiagnostic = async (input: {
  event: AuthEvent;
  email?: string | null;
  status: "success" | "failure";
  errorMessage?: string | null;
  errorCode?: string | null;
  surface?: string;
}) => {
  try {
    await supabase.from("tcd_auth_diagnostics").insert({
      event: input.event,
      email: input.email ?? null,
      status: input.status,
      error_message: input.errorMessage ?? null,
      error_code: input.errorCode ?? null,
      surface: input.surface ?? (typeof window !== "undefined" ? window.location.pathname : null),
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch {
    // Diagnostics must never block the auth flow.
  }
};

// Pulls a useful error string out of a Supabase functions.invoke error or a
// generic Error/PostgrestError.
export const extractErrorMessage = async (error: unknown): Promise<string> => {
  if (!error) return "";
  const maybeResponse = error as { context?: Response; message?: string };
  if (maybeResponse.context instanceof Response) {
    try {
      const body = await maybeResponse.context.clone().json();
      if (typeof body?.error === "string") return body.error;
    } catch {
      /* ignore */
    }
  }
  return maybeResponse.message || String(error);
};

// Translate a raw error into a user-friendly hint. Keep copy short and
// editorial - this surfaces directly in toast/inline UI.
export const interpretAuthError = (
  event: AuthEvent,
  rawMessage: string,
): AuthHint => {
  const m = (rawMessage || "").toLowerCase();

  if (m.includes("rate") || m.includes("too many") || m.includes("429")) {
    return {
      title: "Too many attempts",
      description: "Wait a minute before requesting another email. Check your inbox and spam folder first.",
      severity: "warning",
    };
  }

  if (m.includes("expired") || m.includes("otp") && m.includes("invalid")) {
    return {
      title: "Link expired",
      description: "This access link is no longer valid. Request a fresh one - links expire after a short window.",
      severity: "warning",
    };
  }

  if (m.includes("invalid") && (m.includes("token") || m.includes("link"))) {
    return {
      title: "Invalid link",
      description: "This link cannot be verified. It may have already been used. Request a new one.",
      severity: "warning",
    };
  }

  if (m.includes("invalid login") || m.includes("invalid credentials")) {
    return {
      title: "Sign-in failed",
      description: "Email or password is incorrect. You can also use a sign-in link instead.",
      severity: "error",
    };
  }

  if (m.includes("user not found") || m.includes("no user")) {
    return {
      title: "No account found",
      description: "We could not find this email. Create an account first, or check for typos.",
      severity: "warning",
    };
  }

  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already")) {
    return {
      title: "Account already exists",
      description: "Use the sign-in link or password instead of creating a new account.",
      severity: "info",
    };
  }

  if (m.includes("password") && (m.includes("weak") || m.includes("compromised") || m.includes("pwned"))) {
    return {
      title: "Password not accepted",
      description: "This password appears in known breaches. Choose something stronger and unique.",
      severity: "warning",
    };
  }

  if (m.includes("network") || m.includes("fetch") || m.includes("failed to fetch")) {
    return {
      title: "Network error",
      description: "Check your connection and try again. If your network blocks third-party scripts, disable that for this page.",
      severity: "error",
    };
  }

  if (m.includes("email") && m.includes("not confirmed")) {
    return {
      title: "Email not confirmed",
      description: "Click the secure access link we emailed you. Check spam if you do not see it.",
      severity: "warning",
    };
  }

  // Default fallback by event
  const fallback: Record<AuthEvent, AuthHint> = {
    signup: { title: "Sign up failed", description: rawMessage || "Please try again.", severity: "error" },
    resend: { title: "Could not resend", description: rawMessage || "Please try again in a moment.", severity: "error" },
    magic_link: { title: "Could not send link", description: rawMessage || "Please try again.", severity: "error" },
    signin_password: { title: "Sign in failed", description: rawMessage || "Please try again.", severity: "error" },
    verify_email_link: {
      title: "Verification failed",
      description: "We could not verify this confirmation link. It may have expired or been used. Request a fresh one.",
      severity: "warning",
    },
  };
  return fallback[event];
};
