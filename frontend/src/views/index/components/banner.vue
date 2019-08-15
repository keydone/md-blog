<template>
    <div class="banner-wrap">
        <el-carousel animation="fade">
            <el-carousel-item
                v-for="index in 3"
                :key="index"
            >
                <router-link :to="{ name: 'post' }">
                    轮播 Mac轮播轮播轮播轮播轮播轮播轮播轮播轮播
                    <div class="img">
                        <img src="">
                    </div>
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        components: {},
    };
</script>
