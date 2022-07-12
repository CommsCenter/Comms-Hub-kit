/**
 * cd /var/www/
 * webpack --config=webpack.discover.js
 */
const loader = require('pckg-app-frontend/full.loader.js')
const path = require('path');

module.exports = loader
    .git(false)
    .exports({
        output: {
            path: '/var/www/preview/build',
        },
        entry: {
            autodiscover: [
                '/var/www/autodiscover.js'
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'preview'),
            compress: true,
            port: 9005
        }
    });
