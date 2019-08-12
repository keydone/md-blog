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

        <div
            slot="content-slot"
            class="content-slot"
        >
            <div
                v-for="i in 3"
                :key="i"
                class="col-row"
            >
                <div
                    v-for="index in 2"
                    :key="index"
                    class="col-item"
                >
                    <router-link
                        class="entry-thumb"
                        to="##"
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
                    </router-link>
                    <div class="entry-detail">
                        <h3 class="entry-title">
                            <router-link
                                class="entry-link"
                                to="##"
                            >
                                标题 描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
                            </router-link>
                        </h3>
                        <div class="entry-desc">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
                    </div>
                </div>
            </div>
        </div>
    </blocker>
</template>

<script>
	import blocker from './blocker';

	export default {
		components: {
			blocker,
		},
		data() {
			return {};
		},
	};
</script>
