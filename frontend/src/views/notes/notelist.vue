<template>
    <div class="wrapper">
        <toppic-category />

        <list-vertical :col="3" />
    </div>
</template>

<script>
    import ToppicCategory from '@comp/ToppicCategoary';
    import ListVertical from '@comp/LayoutList/ListVertical';

    export default {
        components: {
            ToppicCategory,
            ListVertical,
        },
    };
</script>
