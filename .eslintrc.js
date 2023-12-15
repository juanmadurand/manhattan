module.exports = {
  env: {
    amd: true,
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: [
      0,
      2,
      {
        SwitchCase: 1,
        offsetTernaryExpressions: false,
        flatTernaryExpressions: false,
        ignoredNodes: ['TemplateLiteral *'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: '16.14',
    },
  },
};
