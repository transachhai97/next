const path = require('path');

module.exports = {
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
