<template>

    <div id="vue-app">
        <div class="as-table table-fixed">
            <div>
                <iframe :src="`${previewUrl}`"></iframe>
            </div>
        </div>

        <div class="as-table table-fixed">
            <div style="width: 80%;">
                <iframe :src="`${previewUrl}&scope=dark`"></iframe>
            </div>
            <div>
                <iframe :src="`${previewUrl}&scope=light`"></iframe>
            </div>
        </div>

        <div class="as-table table-fixed">
            <div style="width: 66%;">
                <iframe :src="`${previewUrl}&scope=primary`"></iframe>
            </div>
            <div>
                <iframe :src="`${previewUrl}&scope=secondary`"></iframe>
            </div>
            <div>
                <iframe :src="`${previewUrl}&scope=dark`"></iframe>
            </div>
        </div>

        <div class="as-table table-fixed">
            <div style="width: 50%">
                <iframe :src="`${previewUrl}&scope=light`"></iframe>
            </div>
            <div style="width: 33%">
                <iframe :src="`${previewUrl}&scope=primary`"></iframe>
            </div>
            <div>
                <iframe :src="`${previewUrl}&scope=secondary`"></iframe>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    mixins: [HubDev.showroom]
}
</script>
