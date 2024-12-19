import withBundleAnalyzer from '@next/bundle-analyzer';
import packageConfig from './package.json' assert { type: 'json' };

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
    optimizePackageImports: [
      '@finch-cloud/process-builder',
      '@finch-cloud/template-builder',
      '@mantine/core',
      '@mantine/hooks',
    ],
  },
  env: { PACKAGE_VERSION: packageConfig.version },
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/templates',
        permanent: false,
      },
    ];
  },
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: `https://forms.dev.finch.fm/api/:path*`,
      },
      // {
      //   source: '/preview/:path*',
      //   destination: `http://localhost:3001/:path*`,
      // },
      {
        source: '/auth/:path*',
        destination: `https://forms.dev.finch.fm/auth/:path*`,
      },
    ];
  },
};

export default function (phase, defaultConfig) {
  const plugins = [bundleAnalyzer];

  const config = plugins.reduce(
    (acc, plugin) => {
      const update = plugin(acc);
      return typeof update === 'function'
        ? update(phase, defaultConfig)
        : update;
    },
    { ...nextConfig }
  );

  return config;
}
