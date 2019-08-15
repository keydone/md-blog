<template>
    <blocker
        id="besttop"
        title="置顶推荐"
    >
        <el-carousel
            slot="content-slot"
            animation="fade"
        >
            <el-carousel-item
                v-for="index in 3"
                :key="index"
            >
                <router-link :to="{ name: 'details' }">
                    轮播 Mac轮播轮播轮播轮播轮播轮播轮播轮播轮播
                    <div class="img">
                        <img src="">
                    </div>
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </blocker>
</template>

<script>
    import blocker from './blocker';

    export default {
        components: {
            blocker,
        },
    };
</script>
