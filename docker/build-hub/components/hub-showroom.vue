<template>
    <div :class="mainScopeClass">
        <!-- header is always rendered as a first element -->
        <component v-if="headerComponent" :is="headerComponent" :data-header-component="headerComponent" v-pb-header></component>

        <!-- offset component is provided for floating headers -->
        <div class="u-app-header-offset"></div>

        <div v-if="isLayoutComponent" :data-layout-component="layoutComponent">
            <!-- add demo slots/actions -->
            <component :is="layoutComponent"></component>
        </div>
        <div v-else-if="isListComponent" :data-list-component="listComponent">
            <!-- add demo contents -->
            <component :is="listComponent" :contents="demoContents"></component>
        </div>
        <div v-else-if="isItemComponent" :data-item-component="itemComponent">
            <component :is="itemComponent" :content="demoContent"></component>
        </div>
        <div v-else-if="mainComponent" :data-main-component="mainComponent" class="container">
            <component :is="mainComponent"></component>
        </div>

        <div class="block">
            <ul class="flex margin-top-lg">
                <li v-for="(components, type) in availableComponents">
                    <b>{{ type }}</b>
                    <ul>
                        <li v-for="component in components">
                            <a :href="component.url">{{ component.component }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    mixins: [HubDev.showroom],
}
</script>
