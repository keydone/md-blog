<template>
    <aside class="main-aside">
        <transition name="transverse-revert">
            <div
                v-if="transition"
                class="aside-container"
            >
                <div class="side-block notice-banner">
                    <div class="imgbanner">
                        <router-link :to="{name: 'index'}">
                            <img
                                src="../../assets/images/adguard.png"
                                class="notice-img"
                            >
                        </router-link>
                    </div>
                    <div class="imgbanner">
                        <router-link :to="{name: 'index'}">
                            <img
                                src="../../assets/images/adguard.png"
                                class="notice-img"
                            >
                        </router-link>
                    </div>
                </div>

                <!-- 站内搜索 -->
                <div class="side-block">
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
                </div>

                <!-- 个人信息 -->
                <div class="side-block">
                    <h3 class="sideblock-title">个人信息</h3>
                    <div class="sideblock-box">
                        <div class="userProfile">
                            <el-button
                                class="empty-block"
                                type="primary"
                            >
                                登录查看
                            </el-button>
                        </div>
                    </div>
                </div>

                <!-- 最新文章 -->
                <div class="side-block">
                    <h3 class="sideblock-title">最新文章</h3>
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
                    <h3 class="sideblock-title">热门标签</h3>
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
	export default {
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
