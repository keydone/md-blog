<template>
    <div class="index-content">
        <!-- 轮播 -->
        <div class="index-block banners">
            banners
            <div class="img">
                <img src="">
            </div>
        </div>

        <!-- 置顶 -->
        <div
            id="besttop"
            class="index-block"
        >
            <div class="block-tab">Mac</div>
            <div class="block-tab">设计</div>
        </div>

        <!-- 最新发布 -->
        <div class="index-block">
            <div class="block-title">
                <h2 class="block-desc">板块标题</h2>
                <a
                    href="##"
                    class="more-link"
                >查看更多
                    <i class="el-icon-right" />
                </a>
                <div class="keywords">
                    <a href="##">key</a>
                    <a href="##">words</a>
                </div>
            </div>
            <div class="block-wrap">
                <!-- <div class="block-tab">Mac</div>
                <div class="block-tab">design</div> -->
                <el-tabs v-model="activeName">
                    <el-tab-pane
                        label="两列"
                        name="first"
                    >
                        <div
                            v-for="i in 6"
                            :key="i"
                            class="col-col-2"
                        >
                            <div
                                v-for="index in 2"
                                :key="index"
                                class="col-item"
                            >
                                <a
                                    class="entry-thumb"
                                    href="##"
                                >
                                    <span
                                        class="thumb-icon"
                                        :style="`background: url(${i});`"
                                    >
                                        <img
                                            :src="i"
                                            class="hidden"
                                        >
                                    </span>
                                </a>
                                <div class="entry-detail">
                                    <h3 class="entry-title">
                                        <a
                                            class="entry-link"
                                            href="##"
                                        >标题 描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</a>
                                    </h3>
                                    <div class="entry-desc">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                        label="三列"
                        name="second"
                    >
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="col-col-3"
                        >
                            <div
                                v-for="index in 3"
                                :key="index"
                                class="col-item"
                            >
                                <a
                                    class="entry-thumb"
                                    href="##"
                                >
                                    <span
                                        class="thumb-img"
                                        :style="`background: url(${i});`"
                                    >
                                        <img
                                            :src="i"
                                            class="hidden"
                                        >
                                    </span>
                                </a>
                                <div class="entry-detail">
                                    <h3 class="entry-title">
                                        <a
                                            class="entry-link"
                                            href="##"
                                        >标题</a>
                                    </h3>
                                    <div class="entry-desc">描述描述</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                        label="角色管理"
                        name="third"
                    >
                        角色管理
                    </el-tab-pane>
                    <el-tab-pane
                        label="定时任务补偿"
                        name="fourth"
                    >
                        定时任务补偿
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 热门板块 -->

        <!-- 站长推荐 -->

        <!-- 文章 -->
    </div>
</template>

<script>
	import { mapState } from 'vuex';
	import { resetToLogin } from '@js/router/auth';
	import { serviceLogin } from '@js/common/services';

	export default {
		name: 'Index',
		data() {
			return {
				activeName: 'first',
			};
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			}),
		},
		created() {
			console.log('isLogin:', this.isLogin);
		},
		methods: {
			loginOut() {
				resetToLogin();
			},
			async http() {
				const { code } = await serviceLogin();

				console.log(code);
			},
		},
	};
</script>

<style lang="scss">
	@import "./index.scss";
</style>
