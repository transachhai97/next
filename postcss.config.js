const purgecss = {
    '@fullhuman/postcss-purgecss': {
        content: [
            './src/pages/**/*.{js,jsx}',
            './src/components/**/*.{js,jsx}',
            './node_modules/**/*.css',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
};

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? purgecss : {}),
    },
};
