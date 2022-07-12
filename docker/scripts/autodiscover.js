const files = require.context('./html/', true, /\.vue$/i);
const jsons = require.context('./html/', true, /comms\.json/i);

window.$vueComponents = files.keys()
    .filter(key => !key.includes('/node_modules/'))
    .map(async (key) => {
        const parts = key.split('/').filter(p => p !== '.');
        parts.reverse();
        let [file, name, type, vendor] = parts;

        vendor = vendor || 'novendor';

        let prefix = `hub-${vendor}-${type}-`;
        let component = `${prefix}${name}`;

        const jso = `/${vendor}/${type}/${name}/comms.json`;

        if (jsons.keys().includes(`.${jso}`)) {
            const json = await import(`./html${jso}`);
            component = json?.share?.as ?? component;
        }

        Vue.component(component, files(key).default)

        return component;
    });
