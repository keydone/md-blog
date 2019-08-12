<template>
    <blocker
        id="besttop"
        title="置顶推荐"
    >
        <slider
            slot="content-slot"
            animation="fade"
        >
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
    </blocker>
</template>

<script>
	import { Slider, SliderItem } from 'vue-easy-slider';
	import blocker from './blocker';

	export default {
		components: {
			blocker,
			Slider,
			SliderItem,
		},
	};
</script>
