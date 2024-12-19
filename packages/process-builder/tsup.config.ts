import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => {
  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    external: ['react', 'react-dom'],
    loader: {
      '.css': 'local-css',
    },
    banner: { js: '"use client"' },
    onSuccess: 'tsc --emitDeclarationOnly --declaration > /dev/null || true',
    ...options,
  };
});
