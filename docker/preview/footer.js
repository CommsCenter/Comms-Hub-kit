Vue.use(Vuex);

Vue.config.devtools = true;
Vue.config.debug = true;

const store = window.$store = new Vuex.Store({
    modules: {
        generic: {
            state: {
                actions: [],
            }
        }
    },
    state: {},
    getters: {
        actionById() {
            return () => ({template:{}});
        },
        config() {
            return (key, def) => ({
                'derive.library.shares': {
                    item: {},
                    list: {},
                    layout: {},
                    header: {},
                }
            }[key] || def);
        },
        actionChildren() {
            return () => [];
        }
    }
});

// add demo config for library shares?

window.$dispatcher = new Vue();

window.$vue = new Vue({
    el: '#vue-app',
    store,
    computed: {
        ...HubDev.showroom.computed,
    }
});
