import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
  info: ErrorInfo | null;
}

/**
 * Catches React render-time errors and shows a friendly editorial fallback
 * page. Also pushes the error into window.__APP_ERRORS__ so the inline
 * pre-React handler in index.html can surface them in one place.
 */
export class RootErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ info });
    try {
      const w = window as unknown as { __APP_ERRORS__?: unknown[] };
      (w.__APP_ERRORS__ ||= []).push({
        source: 'react-error-boundary',
        message: error.message,
        stack: error.stack,
        componentStack: info.componentStack,
        time: new Date().toISOString(),
      });
    } catch {
      /* noop */
    }
    // eslint-disable-next-line no-console
    console.error('[RootErrorBoundary]', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const err = this.state.error;
    const details = [
      err?.message,
      err?.stack,
      this.state.info?.componentStack,
    ]
      .filter(Boolean)
      .join('\n\n');

    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#FDFCFB',
          color: '#0A0A0B',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '64px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%' }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1A3D5C',
              marginBottom: 24,
            }}
          >
            Bombay Breed - Notice
          </p>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 0 24px',
            }}
          >
            Something went wrong loading this page.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#3a3a3c', marginBottom: 32 }}>
            A technical error prevented the site from rendering. Reloading
            usually resolves it. If the issue persists, please email{' '}
            <a href="mailto:hello@bombaybreed.com" style={{ color: '#1A3D5C' }}>
              hello@bombaybreed.com
            </a>
            .
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: '#0A0A0B',
                color: '#FDFCFB',
                border: '1px solid #0A0A0B',
                padding: '12px 24px',
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Reload page
            </button>
            <a
              href="/"
              style={{
                background: 'transparent',
                color: '#0A0A0B',
                border: '1px solid #0A0A0B',
                padding: '12px 24px',
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Home
            </a>
          </div>
          <details style={{ borderTop: '1px solid #e5e5e5', paddingTop: 16 }}>
            <summary
              style={{
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#666',
              }}
            >
              Technical details
            </summary>
            <pre
              style={{
                marginTop: 12,
                fontSize: 12,
                lineHeight: 1.5,
                background: '#f5f4f2',
                padding: 16,
                overflow: 'auto',
                maxHeight: 320,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {details || 'No additional details available.'}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}

export default RootErrorBoundary;
