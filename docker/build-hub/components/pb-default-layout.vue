<template>
    <keep-alive>
        <section class="display-block --section" v-if="actions.length > 0">
            <template v-for="elements in groupedActions">
                <component v-for="action in elements"
                           :action-id="action.id"
                           :is="action.component"
                           :key="action.id"></component>
            </template>
        </section>
    </keep-alive>
</template>

<script>
export default {
    mixins: [CommsHub.layout]
}
</script>
