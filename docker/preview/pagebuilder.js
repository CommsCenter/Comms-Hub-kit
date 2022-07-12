(function () {
    window.CommsHubHelpers = {
        cdn: {
            methods: {
                cdn: image => image,
                imageResize: image => image,
                imageCache: image => image,
            }
        },
        translations: {
            methods: {
                __: key => key,
            }
        },
        timeout: {
            methods: {
                timeout: function (name, callback, timeout, object) {
                    if (typeof object == 'undefined') {
                        object = this;
                    }

                    this.removeTimeout(name, object);

                    this.setTimeout(name, callback, timeout, object);
                },
                removeTimeout: function (name, object) {
                    if (typeof object == 'undefined') {
                        object = this;
                    }

                    if (object['_pckgTimeout' + name]) {
                        clearTimeout(this['_pckgTimeout' + name]);
                    }
                },
                setTimeout: function (name, callback, timeout, object) {
                    if (typeof object == 'undefined') {
                        object = this;
                    }

                    object['_pckgTimeout' + name] = setTimeout(callback, timeout);
                }
            }
        },
    };

    window.CommsHubUse = {

        // was pckgAction
        action: {
            computed: {
                action: function () {
                    return this.$store.getters.selectedGenericAction;
                }
            },
            methods: {
                markActionAsChanged() {
                    $store.commit('markChangedAction', this.action.id);
                }
            }
        },

        // was pckgItemTemplate
        itemComponent: {
            computed: {
                itemComponent: function () {
                    let selected = this.action && this.action.template ? (this.action.template.item || null) : null;

                    /**
                     * Map to first valid template.
                     */

                    if (!selected || !this.itemTemplates[selected]) {
                        this.action.template.item = selected = Object.keys(this.itemTemplates)[0] || null;
                    }

                    return selected;
                }
            }
        },

        // was pckgStaticComponent
        static: {
            computed: {
                templateClass: function () {
                    return this.$options.name;
                }
            }
        },

        // was pckgActionAttrs
        actionAttrs: {
            computed: {
                actionClass: function () {
                    if (!this.action) {
                        return;
                    }

                    let typeSuffix = this.$options.name.replace('pckg-', '');
                    if (this.action.type === 'container') {
                        typeSuffix = this.action.settings.container && this.action.settings.container.length > 0
                            ? this.action.settings.container
                            : 'container';
                    } else if (this.action.type === 'row') {
                        if (['mediaGrid'].indexOf(this.action.settings.rowType) >= 0) {
                            typeSuffix = 'media-grid';
                        }
                        if (['mediaGridNumbered'].indexOf(this.action.settings.rowType) >= 0) {
                            typeSuffix = 'media-grid-numbered';
                        }
                    }

                    if (this.action.settings.classes.length > 0) {
                        typeSuffix = typeSuffix + ' ' + this.action.settings.classes.join(' ');
                    }

                    if (this.action.settings.bgVideo) {
                        typeSuffix = typeSuffix + ' has-video-background';
                    }

                    let mapper = {
                        'bgSize': 'bg-size',
                        'bgRepeat': 'bg-repeat',
                        'bgPosition': 'bg-position',
                    };
                    let mainClass = typeSuffix + ' __pb-action __pb-action--' + this.action.type + ' __action-' + this.action.id;
                    Object.keys(this.action.settings).forEach(function (key) {
                        if (Object.keys(mapper).indexOf(key) < 0) {
                            return;
                        }

                        if (!this.action.settings[key]) {
                            return;
                        }

                        mainClass = mainClass + ' ' + mapper[key] + '-' + this.action.settings[key];
                    }.bind(this));

                    if (this.genericMode === 'edit') {
                        if (this.action.id === $store.state.actionbuilder.activeActionId) {
                            mainClass = mainClass + ' --pb-active';
                        } else if (this.action.settings.classes.indexOf($store.state.actionbuilder.selectedSelector.substring(1)) >= 0) {
                            mainClass = mainClass + ' --pb-multiactive';
                        }

                        if (this.action.id === $store.state.actionbuilder.focusedActionId) {
                            mainClass = mainClass + ' --pb-focus';
                        }
                    }

                    return mainClass.split(' ').filter(function (c) {
                        return c.split('').reverse()[0] !== '-';
                    }).join(' ');
                },
                actionStyle: function () {
                    if (!this.action) {
                        return;
                    }
                    /**
                     * bgAttachment and bgImage should be moved to CSS.
                     * Write a migration where we'll merge them to attributes.
                     * Update references in page builder.
                     */
                    let mapper = {
                        'bgAttachment': 'background-attachment',
                        'bgImage': 'background-image',
                        'margin': 'margin', // @deprecated
                        'padding': 'padding', // @deprecated
                        'style': 'style',
                    };

                    let styles = [];
                    Object.keys(mapper, function (slug) {
                        const attr = mapper[slug];
                        if (Object.keys(mapper).indexOf(slug) < 0) {
                            return;
                        }

                        let setting = this.action.settings[slug];

                        if (!setting) {
                            return;
                        }

                        let value;
                        if (slug === 'style') {
                            value = setting;
                        } else if (slug === 'bgImage') {
                            /**
                             * @hack - hero takes care of background images.
                             */
                            if (this.action.method !== 'hero') {
                                value = attr + ': url(\'' + this.cdn(setting) + '\')';
                            }
                        } else {
                            value = attr + ': ' + setting;
                        }
                        styles.push(value);
                    }.bind(this));

                    return styles.join('; ');
                }
            }
        },

        // was pckgActionAnimation
        animation: {
            watch: {
                'action.settings.animation.effect': function (newVal) {
                    /**
                     * @T00D00 - remove all other effects - to get effect in effect :D
                     */
                    this.makeEffect(newVal);
                },
                'action.settings.animation.speed': function (newVal) {
                    this.$el.classList.remove('slow', 'slower', 'fast', 'faster');
                }
            },
            methods: {
                makeEffect: function (effect, delay, speed) {
                    this.shared.animationStarted = true;
                    this.$el.classList.add('animated', effect, delay || 'no-delay', speed || 'normal-speed');
                    this.$el.classList.remove('animated-out');
                },
                onScroll: function () {
                    if (this.shared.animationStarted) {
                        return;
                    }

                    let topScroll = parseInt($(window).scrollTop());
                    let topOffset = parseInt($(this.$el).offset().top);
                    let clientHeight = document.documentElement.clientHeight;
                    let perc = this.animationSettings.threshold || 80;

                    if (topOffset > topScroll + (clientHeight * perc / 100)) {
                        return;
                    }

                    if (this.shared.animationStarted) {
                        return;
                    }

                    this.makeEffect(this.animationSettings.effect, this.animationSettings.delay, this.animationSettings.speed);
                },
                prepareAnimationSettings: function (defaults) {
                    if (!defaults) {
                        defaults = {};
                    }
                    let defs = {
                        event: null,
                        effect: null,
                        delay: null,
                        infinite: false,
                        threshold: 80
                    };
                    Object.keys(defs).forEach(function (k) {
                        if (Object.keys(defaults).indexOf(k) >= 0) {
                            return;
                        }

                        defaults[k] = defs[k];
                    });
                    return defaults;
                }
            },
            computed: {
                animationSettings: function () {
                    return this.prepareAnimationSettings(this.action ? (this.action.settings.animation || {}) : {});
                },
            },
            mounted: function () {
                let settings = this.animationSettings;

                if (!settings || !settings.event || !settings.effect) {
                    return;
                }

                if (!this.$el.classList) {
                    return;
                }

                this.$el.classList.add('animated-out');
                $scroller.$on('scroll', this.onScroll);
                setTimeout(this.onScroll, 500);
            }
        }
    };

    window.CommsHubLibrary = {
        // was libraryShares
        shares: {
            computed: {
                templates: function () {
                    return this.$store.getters.config('pckg.generic.templates', {});
                },
                actionTemplates: function () {
                    if (!this.action) {
                        return {};
                    }

                    if (!this.templates[this.action.class] || !this.templates[this.action.class][this.action.method]) {
                        return {};
                    }

                    return this.templates[this.action.class][this.action.method];
                },
                libraryShares: function () {
                    return this.$store.getters.config('derive.library.shares', {});
                },
                libraryItemShares: function () {
                    let shares = {};
                    Object.values(this.libraryShares.item).forEach(function (item) {
                        shares[item.identifier] = item.title;
                    });
                    return shares;
                },
                libraryListShares: function () {
                    let shares = {};
                    Object.values(this.libraryShares.list).forEach(function (item) {
                        shares[item.identifier] = item.title;
                    });
                    return shares;
                },
                libraryLayoutShares() {
                    let shares = {};
                    Object.values(this.libraryShares.layout).forEach(function (item) {
                        shares[item.identifier] = item.title;
                    });
                    return shares;
                },
                libraryHeaderShares() {
                    let shares = {};
                    Object.values(this.libraryShares.header).forEach(function (item) {
                        shares[item.identifier] = item.title;
                    });
                    return shares;
                },
                itemTemplates: function () {
                    if (!this.actionTemplates) {
                        return {};
                    }

                    if (!this.actionTemplates.item && (!this.actionTemplates.engine || this.actionTemplates.engine.indexOf('item') === -1)) {
                        return {};
                    }

                    return this.actionTemplates.item || this.libraryItemShares;
                },
                listTemplates: function () {
                    if (!this.actionTemplates) {
                        return {};
                    }

                    if (!this.actionTemplates.list && (!this.actionTemplates.engine || this.actionTemplates.engine.indexOf('list') === -1)) {
                        return {};
                    }

                    return this.actionTemplates.list || this.libraryListShares;
                }
            }
        }
    };

    window.CommsHub = {

        // was pckgSmartComponent
        component: {
            mixins: [CommsHubHelpers.translations, CommsHubHelpers.cdn, CommsHubHelpers.timeout, CommsHubUse.static, CommsHubUse.itemComponent, CommsHubLibrary.shares],
            props: {
                actionId: {
                    required: true
                },
                finalContent: {
                    default: null
                }
            },
            data: function () {
                return {
                    loading: false,
                };
            },
            computed: {
                genericMode: function () {
                    return $store.state.generic.genericMode;
                },
                action: function () {
                    return $store.getters.actionById(this.actionId);
                },
                subactions: function () {
                    if (!this.action) {
                        return;
                    }

                    return $store.getters.actionChildren(this.actionId);
                },
                content: function () {
                    return this.finalContent || this.action.content;
                },
                subcontents: function () {
                    if (!this.content) {
                        return [];
                    }

                    return this.content.contents || [];
                },
                listComponent: {
                    get: function () {
                        /**
                         * @T00D00 - Check if
                         */
                        return (this.action ? this.action.template.list : null) || 'derive-list-bootstrap';
                    }, set: function () {
                    }
                }
            },
            methods: {
                getSlotActions: function (slots) {
                    if (!Array.isArray(slots)) {
                        slots = [slots];
                    }
                    return this.subactions.filter(function (subaction, i) {
                        if (subaction.template && subaction.template.slot) {
                            return slots.indexOf(subaction.template.slot) >= 0;
                        }

                        return false;

                        let indexed = slots.indexOf(i) < 0 ? null : subaction;
                        if (!indexed) {
                            return false;
                        }

                        return true;
                    });
                },
            },
            mounted: function () {
                /**
                 * @T00D00 - only one component should listen?
                 */
                if (!this.action) {
                    return;
                }
                $dispatcher.$on('pckg-action:' + this.action.id + ':listSubitemSelected', function (newItem) {
                    /**
                     * Categories > Offers > Packets
                     * On category page we display offers and all packets. Click on offer reload packets.
                     * Use url: api.$type.$id.$collection somehow dynamically
                     */
                    this.loading = true;
                    let plural = newItem.type == 'offer' ? 'offers' : 'categories';
                    let collection = newItem.type == 'offer' ? 'packets' : 'offers';
                    http.getJSON('/api/' + plural + '/' + newItem.id + '/' + collection, function (data) {
                        this['my' + collection] = data[collection];
                        this.loading = false;
                        this.$nextTick(function () {
                            $('html, body').animate({
                                scrollTop: $(this.$el).offset().top + 'px'
                            }, 333);
                        }.bind(this));
                    }.bind(this), function () {
                        this.loading = false;
                        $dispatcher.$emit('notification:error', 'Error fetching ' + collection);
                    }.bind(this));

                    return false;
                }.bind(this));

                $dispatcher.$on('listItemSelected', function (newItem) {

                    /**
                     * Categories > Offers > Packets
                     * On category page we display offers and all packets. Click on offer reload packets.
                     * Use url: api.$type.$id.$collection somehow dynamically
                     */
                    this.loading = true;
                    let plural = newItem.type == 'category' ? 'categories' : 'offers';
                    let collection = newItem.type == 'category' ? 'offers' : 'offers';
                    http.getJSON('/api/' + plural + '/' + newItem.id + '/' + collection, function (data) {
                        this['my' + collection] = data[collection];
                        this.loading = false;
                    }.bind(this), function () {
                        this.loading = false;
                        $dispatcher.$emit('notification:error', 'Error fetching ' + collection);
                    }.bind(this));

                }.bind(this));
            },
        },

        // was pckgElement
        element: {
            mixins: [CommsHubHelpers.cdn, CommsHubHelpers.timeout, CommsHubUse.actionAttrs, CommsHubUse.animation],
            props: {
                actionId: {
                    default: null
                },
                hardAction: {
                    default: null
                },
            },
            data: function () {
                return {
                    shared: {}
                };
            },
            computed: {
                viewMode: function () {
                    return $store.state.generic.viewMode;
                },
                genericMode: function () {
                    return $store.state.generic.genericMode;
                },
                action: function () {
                    return this.hardAction ? this.hardAction : (this.actionId ? $store.getters.actionById(this.actionId) : null);
                },
                content: function () {
                    return this.action ? this.action.content : {};
                },
                id: function () {
                    return !this.action ? null : (this.action.type + '-' + this.action.id);
                },
                subactions: function () {
                    return $store.getters.actionChildren(this.actionId);
                }
            }
        },

        // was pckgSmartItem
        item: {
            mixins: [CommsHubHelpers.translations, CommsHubHelpers.cdn],
            props: {
                content: {
                    required: true
                },
                action: {
                    default: null,
                },
                index: {
                    type: Number,
                    default: 0
                },
                settings: {
                    type: Object,
                    default: function () {
                        return {
                            perRow: 3,
                        };
                    }
                }
            },
            data: function () {
                return {
                    templateRender: null,
                    tpl: 'derive-item',
                    myAction: this.action,
                    myContent: typeof this.content == 'string' ? JSON.parse(this.content) : this.content,
                };
            },
            created: function () {
                /**
                 * Transfer capabilities to parent.
                 */
                if (!this.$options.capabilities || !this.$parent || !this.$parent.pushChildCapabilities) {
                    return;
                }
                this.$parent.pushChildCapabilities(this.$options.capabilities);
            },
            render: function (h) {
                if (!this.templateRender) {
                    if (this.$options.template) {
                        return this.$options.template;
                    }

                    return h('div', 'Loading ...');
                }

                return this.templateRender();
            },
            computed: {
                templateClass: function () {
                    return 'derive-item ' + this.$options.name
                        + ' v' + utils.ucfirst(this.$options.name.replace('derive-item-', '').replace('derive-item', 'default'));
                },
                perRow: function () {
                    if (this.myAction) {
                        return this.myAction.settings.perRow || 2;
                    }

                    return this.settings.perRow || 2;
                },
                magicTemplateClass: function () {
                    /**
                     * Skip bootstrap width classes for
                     */
                    if (this.myAction && ['mediaGrid', 'mediaGridNumbered'].indexOf(this.myAction.settings.rowType) >= 0) {
                        return this.templateClass;
                    } else if (this.capabilities && this.capabilities.indexOf('no-grid') >= 0) {
                        return this.templateClass;
                    }

                    return [this.templateClass, 'col-xs-12', 'col-sm-' + (12 / this.perRow)];
                },
                contents: function () {
                    if (!this.content) {
                        return [];
                    }

                    return this.content.contents || [];
                }
            },
            mounted: function () {
                this.registerActionListeners();
            },
            watch: {
                tpl: {
                    immediate: true,
                    handler: function (newVal, oldVal) {
                        return;
                        let template = $store.getters.resolveTemplate(newVal, this.$options.template);

                        let res = typeof template === 'string' ? Vue.compile(template) : template;

                        this.templateRender = res.render;

                        // staticRenderFns belong into $options,
                        // appearantly

                        this.$options.staticRenderFns = [];

                        // clean the cache of static elements
                        // this is a cache of the results from the staticRenderFns
                        this._staticTrees = [];

                        // Fill it with the new staticRenderFns
                        if (res.staticRenderFns) {
                            for (var i in res.staticRenderFns) {
                                //staticRenderFns.push(res.staticRenderFns[i]);
                                this.$options.staticRenderFns.push(res.staticRenderFns[i]);
                            }
                        }
                    }
                }
            },
            methods: {
                registerActionListeners: function () {
                    if (!this.myAction) {
                        return;
                    }

                    $dispatcher.$on('pckg-action:' + this.myAction.id + ':perRow-changed', function (newVal) {
                        this.myAction.settings.perRow = newVal;
                    }.bind(this));
                }
            }
        },

        list: {
            mixins: [CommsHubHelpers.translations, CommsHubHelpers.cdn, CommsHubLibrary.shares, CommsHubUse.itemComponent],
            props: {
                contents: {
                    type: Array
                },
                action: {
                    type: Object,
                    required: true
                }
            },
            data: function () {
                return {
                    myAction: this.action,
                    capabilities: {}
                };
            },
            methods: {
                pushChildCapabilities: function (capabilities) {
                    Object.values(capabilities).forEach(function (capability) {
                        this.$set(this.capabilities, capability, true);
                        //this.capabilities[capability] = true;
                    }.bind(this));
                },
                hasCapability: function (capability) {
                    return !!this.capabilities[capability];
                }
            },
            computed: {
                content: function () {
                    return this.action.content;
                },
                subcontents: function () {
                    if (this.contents) {
                        return this.contents;
                    }

                    if (!this.content) {
                        return [];
                    }

                    return this.content.contents || [];
                },
                subactions: function () {
                    return $store.getters.actionChildren(this.action.id);
                },
                templateClass: function () {
                    return 'derive-list ' + this.$options.name
                        + ' v' + utils.ucfirst((this.$options.name || '').replace('derive-list-', '').replace('derive-list', 'default'))
                        + ' v' + utils.ucfirst((this.itemComponent || '').replace('derive-item-', '').replace('derive-item', 'default'));
                },
                hasMediaGrid: function () {
                    return ['mediaGrid', 'mediaGridNumbered'].indexOf(this.action.settings.rowType) >= 0;
                },
                mediaGridClass: function () {
                    if (!this.hasMediaGrid) {
                        return null;
                    }

                    return this.action.settings.rowType === 'mediaGrid' ? 'media-grid' : 'media-grid-numbered';
                }
            }
        },

        layout: {
            mixins: [CommsHubHelpers.translations, CommsHubHelpers.cdn],
            computed: {
                actions: function () {
                    return Object.values(this.$store.state.generic.actions);
                },
                groupedActions: function () {
                    return [
                        this.$store.getters.groupedRootElements.header,
                        this.$store.getters.groupedRootElements.content,
                        this.$store.getters.groupedRootElements.footer
                    ];
                }
            }
        },

        header: { // was: pckgHeader
            mixins: [CommsHubHelpers.translations, CommsHubHelpers.cdn],
            data: function () {
                return {
                    mobile: false
                };
            },
            created: function () {
                $dispatcher.$on('menu:toggle', this.toggleMobile);
                $dispatcher.$on('menu:close', this.closeMobile);
                $dispatcher.$on('menu:open', this.openMobile);
            },
            beforeDestroy: function () {
                $dispatcher.$off('menu:toggle', this.toggleMobile);
                $dispatcher.$off('menu:close', this.closeMobile);
                $dispatcher.$off('menu:open', this.openMobile);
            },
            methods: {
                toggleMobile: function () {
                    this.mobile = !this.mobile;
                    $('body')[this.mobile ? 'addClass' : 'removeClass']('@menu-active');
                },
                closeMobile: function () {
                    this.mobile = false;
                    $('body').removeClass('@menu-active');
                },
                openMobile: function () {
                    this.mobile = true;
                    $('body').addClass('@menu-active');
                }
            },
            computed: {
                mobileClass: function () {
                    return this.mobile ? 'in' : 'out';
                },
                homepageUrl: function () {
                    return Pckg.router.homepage;
                },
                siteTitle: function () {
                    return Pckg.site.title;
                },
                mobileLogo: function () {
                    return Pckg.site.design.logoMobile;
                },
                desktopLogo: function () {
                    return Pckg.site.design.logoDesktop;
                },
                scopeClass: function () {
                    return 'scope-bg-' + Pckg.site.design.headerScope;
                },
                basket: function () {
                    return this.$store.state.basket;
                }
            }
        }

    };
})();

window.utils = {
    ucfirst: () => {
    },
};

window.HubDev = {
    showroom: {
        computed: {
            demoContents: function () {
                return [
                    {
                        title: 'My short title',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
                        url: 'https://comms.dev',
                        image: 'https://startmaestro.cdn.startcomms.com/storage/uploads/bg-top.jpg',
                        _original: {},
                    },
                    {
                        title: 'Another a bit longer title that may break',
                        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>',
                        url: '/',
                        image: 'https://startmaestro.cdn.startcomms.com/storage/uploads/editor/s1_2.jpg',
                        _original: {},
                    }
                ];
            },
            availableComponents: function () {
                return window.$vueComponents.reduce((reduced, component) => {
                    console.log(component);
                    let split = component.split('-');
                    if (false && split[0] !== 'hub') {
                        return reduced;
                    }
                    let available = ['item', 'list', 'component', 'page', 'layout'];
                    if (split.length < 3 || !available.includes(split[2])) {
                        //return reduced;
                    }
                    if (!reduced[split[2]]) {
                        reduced[split[2]] = [];
                    }
                    reduced[split[2]].push({
                        component,
                        url: `/?${split[2]}=${component}`
                    });
                    return reduced;
                }, {});
            },
            demoContent: function () {
                return this.demoContents[0];
            },
            searchParams: function () {
                return (new URLSearchParams(window.location.search));
            },
            headerComponent: function () {
                return this.searchParams.get('header') || 'pb-default-header';
            },
            isHeaderComponent: function () {
                return !!this.searchParams.get('header');
            },
            isLayoutComponent: function () {
                return !!this.searchParams.get('layout');
            },
            isListComponent: function () {
                return !!this.searchParams.get('list');
            },
            layoutComponent: function () {
                return this.searchParams.get('layout') || 'pb-default-layout';
            },
            listComponent: function () {
                return this.searchParams.get('list') || 'pb-default-list';
            },
            itemComponent: function () {
                return this.searchParams.get('item') || 'pb-default-item';
            },
            isItemComponent: function () {
                return !!this.searchParams.get('item');
            },
            mainComponent: function () {
                return this.searchParams.get('component') || 'pb-default-component';
            },
            isMainComponent: function () {
                return !!this.searchParams.get('component');
            },
            mainScopeClass: function () {
                const scope = this.searchParams.get('scope');
                if (!scope) {
                    return '';
                }

                return `scope-bg-${scope}`;
            },
            previewUrl: function () {
                return `/?layout=${this.layoutComponent}&list=${this.listComponent}&item=${this.itemComponent}&component=${this.mainComponent}`;
            },
        }
    }
}
