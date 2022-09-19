import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import useSiteMetadata from "./SiteMetadata";

function Head({
  description,
  image,
  canonical,
  imageWidth,
  imageHeight,
  meta,
  author,
  keywords,
  title,
  previousUrl,
  nextUrl,
  publishedAt,
  updatedAt,
}) {
  const siteMetadata = useSiteMetadata();
  const metaDescription = description || siteMetadata.description;
  const metaCanonical =
    canonical || (typeof window !== "undefined" ? window.location.href : null);
  const metaImage = image || `/img/og-image.jpg`;
  const metaImageWidth = image ? imageWidth : "800";
  const metaImageHeight = image ? imageHeight : "800";

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={meta}
    >
      {/* GENERAL */}
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#fff" />
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="generator" content="fullstackrocket.com" />
      <link rel="canonical" href={metaCanonical} />
      {previousUrl && <link rel="prev" href={previousUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      {/* TWITTER https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      <meta name="twitter:image" content={image} />
      {siteMetadata.twitterUser && (
        <meta name="twitter:site" content={siteMetadata.twitterUser} />
      )}

      {/* OPENGRAPH https://ogp.me/ */}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:type" content="business.business" />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={title} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      {metaImage && <meta property="og:image:secure_url" content={metaImage} />}
      {metaImageWidth && (
        <meta property="og:image:width" content={metaImageWidth} />
      )}
      {metaImageHeight && (
        <meta property="og:image:height" content={metaImageHeight} />
      )}
      {publishedAt && (
        <meta property="og:article:published_time" content={publishedAt} />
      )}
      {updatedAt && (
        <meta property="og:article:modified_time" content={updatedAt} />
      )}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/img/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/img/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/img/favicon-16x16.png"
        sizes="16x16"
      />
    </Helmet>
  );
}

Head.defaultProps = {
  title: null,
  meta: [],
  keywords: null,
  image: null,
  imageWidth: null,
  imageHeight: null,
};

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.string,
  canonical: PropTypes.string,
  author: PropTypes.string,
  previousUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  publishedAt: PropTypes.string,
  updatedAt: PropTypes.string,
};

export default Head;
