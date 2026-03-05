import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Bombay Breed';
const BASE_URL = 'https://bombaybreed.com';

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string; // slug e.g. "og-home" → /og/og-home.png, or full URL starting with http
  article?: {
    publishedDate: string;
    author?: string;
  };
}

const PageHead = ({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = 'og-home',
  article,
}: PageHeadProps) => {
  const canonicalUrl = `${BASE_URL}${path}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}/og/${ogImage}.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article-specific */}
      {article?.publishedDate && (
        <meta property="article:published_time" content={article.publishedDate} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
    </Helmet>
  );
};

export default PageHead;
