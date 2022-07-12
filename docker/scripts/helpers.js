module.exports = (env) => {

    let capitalize = function (str) {
        if (str.indexOf('-') > 0) {
            return str.split('-').map(capitalize).join('');
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    };

    let param = function (name, def) {
        if (env && typeof env[name] !== 'undefined') {
            return env[name];
        }

        if (typeof def !== 'undefined') {
            return def;
        }

        throw name + " must be defined ";
    }

    let guessParams = function () {
        return {
            shareName,
            shareType,
            shareVendor
        };
    };

    let wd = param('WD', '');
    if (wd.length) {
        wd = '/' + wd;
    }

    let shareName, shareType, shareVendor;
    try {
        shareType = param('SHARE_TYPE');
        shareVendor = param('SHARE_VENDOR');
        shareName = param('SHARE');
    } catch (e) {
        console.log(e, 'Trying with split');
        try {
            const share = param('SHARE').split('/');
            const originalShare = [...share];
            share.reverse();

            shareName = share[1];
            shareType = share[2];
            shareVendor = share[3];
            if (!shareType || !shareVendor || !shareName) {
                console.log(share);
                throw "Cannot detect type, vendor or name";
            }

            if (share[0] !== share[1] + '.vue') {
                console.log(share);
                throw "File and folder miss-named"
            }

            if (!wd.length) {
                wd = '/' + originalShare.slice(0, originalShare.length - 1).join('/');
                console.log(wd);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const publicPath = `/build-hub/${shareType}/${shareVendor}/${shareName}/build/`;

    if (!(['list', 'item', 'page', 'style', 'component', 'layout', 'theme', 'header'].indexOf(shareType) >= 0)) {
        throw `Invalid share type ${shareType}/${shareVendor}/${shareName}`;
    }

    /**
     * Prefix jsonpFunction with unique name.
     * Hub*Type*Vendor*Share
     */
    let library = capitalize(['hub', shareType, shareVendor, shareName].join('-'));
    let entry = {};

    /**
     * Use standardized entry files.
     */
    entry[shareName] = '.' + wd + '/' + shareName + '.js';

    return {library, entry, wd, publicPath};
}
