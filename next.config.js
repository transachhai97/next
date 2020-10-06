const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const nextBuildId = require('next-build-id');
// eslint-disable-next-line import/no-extraneous-dependencies
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
// eslint-disable-next-line import/no-extraneous-dependencies
const genericNames = require('generic-names');
// eslint-disable-next-line import/no-extraneous-dependencies
const StyleLintPlugin = require('stylelint-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const withOffline = require('next-offline');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const withPWA = require('next-pwa');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = isProduction
    ? '[name]__[local]--[hash:base64:5]'
    : '[path][name]__[local]';

const generate = genericNames(localIdentName, {
    context: process.cwd(),
});

// eslint-disable-next-line no-shadow,max-len
const getLocalIdent = (loaderContext, localIdentName, localName) => generate(localName, loaderContext.resourcePath);

const nextConfig = {
    // Target must be serverless
    target: 'serverless',
    generateBuildId: () => nextBuildId({ dir: __dirname }),
    webpack: (config, {
        // eslint-disable-next-line no-unused-vars
        buildId, dev, isServer, defaultLoaders, webpack,
    }) => {
        // Note: we provide webpack above so you should not `require` it
        const newConfig = config;

        if (dev) {
            newConfig.plugins.push(
                new StyleLintPlugin({
                    files: [
                        'src/**/*.{js,jsx,htm,html,css,sss,less,scss,sass}',
                    ],
                    emitWarning: true,
                }),
            );
        }

        if (isProduction) {
            newConfig.plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.join(__dirname, 'docs'),
                            to: path.join(__dirname, 'public/docs'),
                        },
                    ],
                }),
                new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: [
                        path.join(process.cwd(), 'public/docs/**/*'),
                    ],
                }),
                new WebpackPwaManifest({
                    filename: 'static/manifest.json',
                    name: 'Next PWA',
                    short_name: 'Next-PWA',
                    description:
                        'A Movie browsing PWA using Next.js and Google Workbox',
                    background_color: '#ffffff',
                    theme_color: '#5755d9',
                    display: 'standalone',
                    orientation: 'portrait',
                    fingerprints: false,
                    inject: false,
                    start_url: '/',
                    ios: {
                        'apple-mobile-web-app-title': 'Next-PWA',
                        'apple-mobile-web-app-status-bar-style': '#5755d9',
                    },
                    icons: [
                        {
                            src: path.resolve('public/icon.png'),
                            sizes: [96, 128, 192, 256, 384, 512],
                            destination: '/static',
                        },
                    ],
                    includeDirectory: true,
                    publicPath: '/_next/',
                }),
            );
        }

        // Important: return the modified config
        return newConfig;
    },
};

module.exports = withPlugins(
    [
        // add plugins here..
        [withOffline, {}],
        [
            withPWA,
            {
                pwa: {
                    disable: !isProduction,
                    dest: 'public',
                    sw: 'service-worker.js',
                    buildExcludes: [/.*docs.*$/, /.*icon_.*$/],
                },
            },
        ],
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
                        options,
                    ) => {
                        const pathLocalName = loaderContext.resourcePath;
                        if (
                            pathLocalName.includes('src/styles/index.scss')
                            || pathLocalName.includes('src\\styles\\index.scss')
                            || pathLocalName.includes('node_modules')
                            || localName === 'mode-dark'
                        ) {
                            return localName;
                        }
                        return getLocalIdent(
                            loaderContext,
                            localIdentName,
                            localName,
                        );
                    },
                },
            },
        ],
    ],
    nextConfig,
);
