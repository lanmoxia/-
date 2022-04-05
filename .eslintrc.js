module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    '@typescript-eslint/no-var-requires': 0,
    "no-unused-vars":0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  // 解决全局属性报错
  "globals":{
    // 解决 __WebpackModuleApi":"writable 报错
    "__WebpackModuleApi":"writable",
    // 解决 custom 中全局属性 ESLint: 'Xxx' is not defined.(no-undef) 报错
    "RecordItem": true,
    "Tag": true,
    "tagListModel": true
  }
}
