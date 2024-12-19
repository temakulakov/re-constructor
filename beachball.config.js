const fs = require('fs');

const postbump = (packagePath, packageName, packageVersion) => {
  fs.rm(`${packagePath}/CHANGELOG.json`, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    return;
  });
};

// Overriding the default entry renderer so that it just shows the comment without the author.
const customRenderEntry = (ChangelogEntry) =>
  new Promise((res) => res(`- ${ChangelogEntry.comment}`));

module.exports = {
  branch: 'origin/master',
  bumpDeps: false,
  disallowedChangeTypes: ['prerelease'],
  generateChangelog: true,
  hooks: { postbump },
  scope: ['packages/*', 'apps/*'],
  registry: 'https://git.finch.fm/api/v4/projects/1051/packages/npm/',
  ignorePatterns: [
    '**/*.{shot,snap}',
    '**/*.{test,spec}.{ts,tsx}',
    '**/*.stories.tsx',
    '**/.eslintrc.*',
    '**/__fixtures__/**',
    '**/__mocks__/**',
    '**/jest.config.js',
    '**/tests/**',
  ],
  changelog: {
    customRenderers: {
      renderEntry: customRenderEntry,
    },
  },
};
