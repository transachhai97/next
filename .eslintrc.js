module.exports = {
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
    ],
    plugins: ['react'],
    parser: 'babel-eslint',
    rules: {
        'no-console': 0,
        'import/no-unresolved': 0,
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'react/jsx-props-no-spreading': 0,
    },
};
