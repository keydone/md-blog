<template>
    <div
        :id="id"
        class="index-block"
    >
        <div
            v-if="showtitle"
            class="block-title"
        >
            <h2 class="block-desc">{{ title }}</h2>
            <slot name="title-slot" />
        </div>
        <div class="block-wrap">
            <slot name="content-slot" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type:    String,
                default: '',
            },
            title: {
                type:    String,
                default: '',
            },
            showtitle: {
                type:    Boolean,
                default: true,
            },
        },
        data() {
            return {};
        },
    };
</script>
