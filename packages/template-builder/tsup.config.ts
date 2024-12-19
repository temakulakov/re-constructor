import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => {
  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    external: ['react', 'react-dom'],
    loader: {
      '.css': 'local-css',
    },
    onSuccess: 'tsc --emitDeclarationOnly --declaration || true',
    ...options,
  };
});
