const isProduction = process.env.NODE_ENV === 'production';

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

const cssnano = {
    cssnano: {
        preset: [
            'default',
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    },
};

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(isProduction ? purgecss : {}),
        ...(isProduction ? cssnano : {}),
    },
};
