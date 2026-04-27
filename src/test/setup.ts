import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom polyfills - several Radix UI primitives used inside <Insights /> read
// these globals at mount time. Force-assign so we always win, even if jsdom
// later defines partial implementations.
class ResizeObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
class IntersectionObserverMock {
  root: Element | null = null;
  rootMargin = '';
  thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver = ResizeObserverMock;
(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserverMock }).IntersectionObserver = IntersectionObserverMock;

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }
  if (!('scrollTo' in window)) {
    (window as unknown as { scrollTo: () => void }).scrollTo = () => {};
  }
}
