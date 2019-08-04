<template>
    <blocker
        id="newest"
        title="最新发布"
    >
        <div
            slot="title-slot"
            class="fr"
        >
            <div class="keywords">
                <router-link to="##">key</router-link>
                <router-link to="##">words</router-link>
            </div>
            <router-link
                to="##"
                class="more-link"
            >
                查看更多
                <i class="el-icon-arrow-right" />
            </router-link>
        </div>

        <el-tabs
            slot="content-slot"
            v-model="activeName"
        >
            <el-tab-pane
                label="两列"
                name="first"
            >
                <div
                    v-for="i in 6"
                    :key="i"
                    class="col-row"
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
                    class="col-row"
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
    </blocker>
</template>

<script>
	import blocker from './blocker';
	export default {
		components: {
			blocker,
		},
		data() {
			return {
				activeName: 'first',
			};
		},
	};
</script>
