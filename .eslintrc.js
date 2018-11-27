module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'vue'
    ],
    globals: {
        $app: true,
    },
    rules: {
        'no-console': 0,
        'no-unused-vars': 1,
        'import/no-unresolved': 'off',
        'array-bracket-spacing': [2, 'never'],
        'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
        'comma-dangle': [2, 'always-multiline'],
        'eol-last': 2,
        'eqeqeq': [2, 'allow-null'],
        'func-names': 0,
        'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }],
        'new-cap': 2,
        'new-parens': 2,
        'newline-after-var': 2,
        'no-alert': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-dupe-keys': 2,
        'no-dupe-args': 2,
        'no-extra-semi': 2,
        'no-floating-decimal': 2,
        'no-invalid-regexp': 2,
        'no-multiple-empty-lines': [1, { 'max': 2 }],
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-plusplus': 0,
        'no-prototype-builtins': 0,
        'no-redeclare': 2,
        // 'no-shadow': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-underscore-dangle': 0,
        'no-unneeded-ternary': 2,
        'no-unused-expressions': 0,
        'no-use-before-define': 0,
        'no-var': 2,
        'object-shorthand': 2,
        'operator-assignment': [0, 'always'],
        'prefer-const': 2,
        'prefer-spread': 2,
        'quotes': [1, 'single'],
        'radix': 2,
        'semi': [2, 'always'],
        'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
        'strict': 2,
        'use-isnan': 2,
        'valid-jsdoc': 0,
        'vue/no-v-html': 0,
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': [],
        }],
        'vue/singleline-html-element-content-newline': ['error', {
            'ignoreWhenEmpty': true,
            'ignoreWhenNoAttributes': true,
            'ignores': ['html', 'body', 'article', 'hgroup', 'figure', 'main', 'section', 'header', 'footer', 'aside', 'nav', 'video', 'audio', 'canvas', 'details', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'dl', 'dd', 'ul', 'li', 'ol', 'label', 'form', 'input', 'img', 'textarea', 'th', 'tr', 'td', 'button', 'select', 'a', 'span', 'em', 'i', 'sub', 'sup', 'pre', 'code', 'table'],
        }],
    }
}
