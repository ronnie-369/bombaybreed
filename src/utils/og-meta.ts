/**
 * Sets Open Graph meta tags for the current page.
 * Call in useEffect; returns a cleanup function that removes the tags.
 */
export function setOGMeta(opts: {
  title: string;
  description: string;
  image: string; // absolute URL e.g. https://bombaybreed.com/og/og-about.png
  url: string;
}) {
  const tags: Record<string, string> = {
    'og:title': opts.title,
    'og:description': opts.description,
    'og:image': opts.image,
    'og:url': opts.url,
    'twitter:title': opts.title,
    'twitter:description': opts.description,
    'twitter:image': opts.image,
  };

  const created: HTMLMetaElement[] = [];

  for (const [property, content] of Object.entries(tags)) {
    const isOG = property.startsWith('og:');
    const selector = isOG
      ? `meta[property="${property}"]`
      : `meta[name="${property}"]`;
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      if (isOG) el.setAttribute('property', property);
      else el.setAttribute('name', property);
      document.head.appendChild(el);
      created.push(el);
    }
    el.setAttribute('content', content);
  }

  return () => {
    created.forEach((el) => el.remove());
  };
}
