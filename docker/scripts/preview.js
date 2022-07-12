const files = require.context('./html/', true, /\.vue$/i);
import PBLink from './vendor/commscenter/pagebuilder-extension-core/src/CommsCenter/PBCore/public/basic/pb-link.vue';
import PBComms from './vendor/commscenter/pagebuilder-extension-comms/src/CommsCenter/PBComms/public/plugin.frontend.js';
import Mixins from "./vendor/commscenter/pagebuilder/src/CommsCenter/PageBuilder/public/pagebuilder.mixins.plugin.js";

files.keys()
    .filter(key => !key.includes('/node_modules/') && key.includes('/build-hub/components/'))
    .forEach(key => {
        const props = key.split('/');
        props.reverse();

        let [file, name, type, vendor] = props;
        name = file.split('.')[0];

        Vue.component(name, files(key).default)
    });

// we also want to register some core components?
Vue.use(PBComms);
Vue.component('pb-link', PBLink);
Vue.use(Mixins);
