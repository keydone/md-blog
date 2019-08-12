<template>
    <div class="banner-wrap">
        <slider animation="fade">
            <slider-item
                v-for="index in 3"
                :key="index"
                :speed="300"
            >
                <router-link :to="{ name: 'softs-detail' }">
                    轮播 Mac轮播轮播轮播轮播轮播轮播轮播轮播轮播
                    <div class="img">
                        <img src="">
                    </div>
                </router-link>
            </slider-item>
        </slider>
    </div>
</template>

<script>
	import { Slider, SliderItem } from 'vue-easy-slider';

	export default {
		components: { Slider, SliderItem },
	};
</script>
