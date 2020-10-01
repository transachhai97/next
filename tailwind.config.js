const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    purge: [],
    theme: {
        extend: {},
    },
    variants: {},
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    plugins: [isDev ? require('tailwindcss-debug-screens') : []],
};
