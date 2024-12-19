import Head from 'next/head';

export const HeadScripts: React.FC<{ text: string }> = ({ text }) => (
  <Head>{text}</Head>
);
