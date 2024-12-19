import React from 'react';
import Head from 'next/head';
import { formatAssetUrl } from '~utils/formatAssetUrl';

import { MetaTags as MetaTagsProps } from './types';

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image,
  custom,
  url,
}) => (
  <Head>
    <meta charSet="UTF-8" />
    <meta
      name="viewport"
      // eslint-disable-next-line
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1"
    />
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
      </>
    )}
    {description && (
      <>
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
      </>
    )}
    {keywords && <meta name="keywords" content={keywords} />}
    {image && (
      <meta property="og:image" content={formatAssetUrl({ url: image })} />
    )}
    {url && <meta property="og:url" content={url} />}
    <meta property="og:locale" content="ru_RU" />
    {custom}
  </Head>
);
