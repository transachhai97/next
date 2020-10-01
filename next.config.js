const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');

// eslint-disable-next-line import/no-extraneous-dependencies
const genericNames = require('generic-names');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = isProduction
    ? '[name]__[local]--[hash:base64:5]'
    : '[path][name]__[local]';

const generate = genericNames(localIdentName, {
    context: process.cwd(),
});

// eslint-disable-next-line no-shadow
const getLocalIdent = (loaderContext, localIdentName, localName) =>
    generate(localName, loaderContext.resourcePath);

const nextConfig = {
    // Target must be serverless
    target: 'serverless',
    // eslint-disable-next-line no-unused-vars
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        const newConfig = config;

        const aliases = config.resolve.alias || {};
        newConfig.resolve.alias = {
            ...aliases,
            'private-next-pages': path.resolve(__dirname, 'src/pages'),
            '@': path.resolve(__dirname, 'src'),
        };

        // Important: return the modified config
        return newConfig;
    },
};

module.exports = withPlugins(
    [
        // add plugins here..
        [
            sass,
            {
                cssModules: true,
                cssLoaderOptions: {
                    importLoaders: 1,
                    getLocalIdent: (
                        loaderContext,
                        // eslint-disable-next-line no-shadow
                        localIdentName,
                        localName,
                        // eslint-disable-next-line no-unused-vars
                        options
                    ) => {
                        const pathLocalName = loaderContext.resourcePath;
                        if (
                            pathLocalName.includes('src/styles/index.scss') ||
                            pathLocalName.includes('src\\styles\\index.scss') ||
                            pathLocalName.includes('node_modules') ||
                            localName === 'mode-dark'
                        ) {
                            return localName;
                        }
                        return getLocalIdent(
                            loaderContext,
                            localIdentName,
                            localName
                        );
                    },
                },
            },
        ],
    ],
    nextConfig
);
