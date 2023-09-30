/* eslint-env node */
module.exports = {
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "eslint/no-constant-condition": "off"
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
};