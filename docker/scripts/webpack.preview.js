/**
 * cd /var/www/
 * webpack --config=webpack.preview.js
 */
const loader = require('pckg-app-frontend/full.loader.js')
const path = require('path');

module.exports = loader
    .git(false)
    .exports({
        output: {
            publicPath: '/',
            path: '/var/www/preview',
        },
        entry: {
            preview: [
                '/var/www/preview.js'
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'preview'),
            compress: true,
            port: 9005
        }
    });
