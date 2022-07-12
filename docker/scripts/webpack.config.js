/**
 * webpack --env.SHARE_TYPE=list --env.SHARE=unusual-list --env.SHARE_VENDOR=comms
 */
const loader = require('pckg-app-frontend/full.loader.js')
const getBuildParams = require('./helpers.js')

module.exports = loader
    .git(false)
    .exportsFn((env) => {
        const {entry, library, wd, publicPath} = getBuildParams(env);
        // we will always serve files from /build-hub/$type/$vendor/$item ?
        // should we use /build-hub/$uuid/?

        const output = {
            // dump to this path
            path: process.cwd() + wd + '/build',
            // use jsonp library to avoid conflicts
            library,
            // use different public path for production
            publicPath,
        };

        return {
            entry,
            output
        };
    });
