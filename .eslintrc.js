module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: [
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
    // REACT
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    // SIMPLE-IMPORT-SORT
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // React and Next related packages come first
          ['^react', '^@react', '^next', '^@next'],
          // NPM packages
          ['^@?\\w'],
          // Type imports
          ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
          // Side effect imports
          ['^\\u0000'],
          //* Path aliased
          [
            '@/assets',
            '@/components',
            '@/hooks',
            '@/lib',
            '@/prisma',
            '@/styles',
          ],
          // Absolute imports
          ['^(src|public)(/.*|$)'],
          // Parent imports. Put `..` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // SIMPLE-IMPORT-SORT
  },
};
