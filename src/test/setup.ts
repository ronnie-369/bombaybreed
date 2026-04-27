import '@testing-library/jest-dom/vitest';

// jsdom polyfills - several Radix UI primitives used inside <Insights /> read
// these globals at mount time.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// @ts-expect-error - jsdom env
globalThis.ResizeObserver = globalThis.ResizeObserver ?? ResizeObserverMock;
// @ts-expect-error - jsdom env
globalThis.IntersectionObserver = globalThis.IntersectionObserver ?? IntersectionObserverMock;

if (typeof window !== 'undefined' && !window.matchMedia) {
  // @ts-expect-error - assigning a partial implementation
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof window !== 'undefined' && !('scrollTo' in window)) {
  // @ts-expect-error - jsdom env
  window.scrollTo = () => {};
}
