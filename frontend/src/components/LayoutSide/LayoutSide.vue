<template>
    <aside class="main-aside">
        <transition name="fade">
            <div
                v-if="transition"
                class="aside-container"
            >
                <div class="side-block notice-banner">
                    <slider
                        slot="content-slot"
                        class="imgbanner"
                        animation="fade"
                        height="135px"
                    >
                        <slider-item
                            v-for="index in 3"
                            :key="index"
                            :speed="300"
                        >
                            <router-link :to="{ name: 'softs-detail' }">
                                <img
                                    src="../../assets/images/adguard.png"
                                    class="notice-img"
                                >
                            </router-link>
                        </slider-item>
                    </slider>
                </div>

                <!-- 站内搜索 -->
                <!-- <div class="side-block">
                    <h3 class="sideblock-title">站内搜索</h3>
                    <div class="sideblock-box">
                        <div class="search">
                            <el-input
                                type="text"
                                placeholder="包罗万象, 想你所想 (回车即搜)"
                            />
                        </div>
                        <div class="statistics">
                            <div class="statistics-span">
                                <h4>收录资源</h4>100
                            </div>
                            <div class="statistics-span">
                                <h4>正式会员</h4>200
                            </div>
                            <div class="statistics-span">
                                <h4>活跃人数</h4>300
                            </div>
                        </div>
                        <div class="align-center">
                            <el-button>投稿</el-button>
                            <el-button type="primary">打赏</el-button>
                        </div>
                    </div>
                </div> -->

                <!-- 个人等级 -->
                <!-- <div class="side-block">
                    <h3 class="sideblock-title">个人等级</h3>
                    <div class="sideblock-box">
                        <div class="userProfile">
                            <router-link
                                class="empty-block block-center"
                                :to="{ name: 'login' }"
                            >
                                <el-button
                                    class="block-center"
                                    type="primary"
                                >
                                    登录 查看
                                </el-button>
                            </router-link>
                        </div>
                    </div>
                </div> -->

                <!-- 最新文章 -->
                <div class="side-block">
                    <h3 class="sideblock-title">
                        最新文章
                        <router-link
                            class="more-link"
                            to="/"
                        >
                            查看更多<i class="el-icon-arrow-right" />
                        </router-link>
                    </h3>
                    <div class="sideblock-box list-col">
                        <router-link
                            class="list-col-item"
                            :to="{name: 'index', query: {id: ''}}"
                        >
                            <div class="list-col-img">
                                <img src="">
                            </div>
                            <div class="list-col-detail">
                                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                                <time>发布时间</time>
                            </div>
                        </router-link>
                        <router-link
                            class="list-col-item"
                            :to="{name: 'index', query: {id: ''}}"
                        >
                            <div class="list-col-img">
                                <img src="">
                            </div>
                            <div class="list-col-detail">
                                <h4>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h4>
                                <time>发布时间</time>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- 热门标签 -->
                <div class="side-block">
                    <h3 class="sideblock-title">
                        热门标签
                        <router-link
                            class="more-link"
                            to="/"
                        >
                            查看更多<i class="el-icon-arrow-right" />
                        </router-link>
                    </h3>
                    <ul class="sideblock-box tags">
                        <li>热门</li>
                        <li>标签</li>
                    </ul>
                </div>
            </div>
        </transition>
    </aside>
</template>

<script>
	import { Slider, SliderItem } from 'vue-easy-slider';

	export default {
		components: {
			Slider,
			SliderItem,
		},
		props: {
			transition: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				// transition: false,
			};
		},
	};
</script>

<style lang="scss">
	@import "./LayoutSide.scss";
</style>
