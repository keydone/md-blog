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
                :to="{name: 'list', query: {sort: 'newest'}}"
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
                v-for="(item, index) in list"
                :key="index"
                class="col-row"
            >
                <div
                    v-for="(value, key) in item"
                    :key="key"
                    class="col-item"
                >
                    <router-link
                        class="entry-thumb"
                        :to="{ name: 'details', query: { id: value._id }}"
                    >
                        <span
                            class="thumb-icon"
                            :style="value.cover ? `background: url(${value.cover});` : ''"
                        >
                            <!-- <img
                                :src="value.cover"
                                class="hidden"
                            > -->
                        </span>
                    </router-link>
                    <div class="entry-detail">
                        <h3 class="entry-title">
                            <router-link
                                class="entry-link"
                                :to="{ name: 'details', query: { id: value._id }}"
                            >
                                {{ value.title }}
                            </router-link>
                        </h3>
                        <div class="entry-desc">{{ value.text }}</div>
                    </div>
                </div>
            </div>
        </div>
    </blocker>
</template>

<script>
    import blocker from './blocker';
    import { newestArticles } from '@js/common/services';

    export default {
        components: {
            blocker,
        },
        data() {
            return {
                list: [],
            };
        },
        created() {
            this.newestArticles();
        },
        methods: {
            async newestArticles() {
                const { code, data } = await this.$http(newestArticles, {
                    params: {
                        pageSize: 6,
                    },
                });

                if (code === 0) {
                    if (data.list && data.list.length) {
                        const list = [[], [], []];

                        for (const index in data.list) {
                            const item = data.list[index];

                            list[index % 3].push(item);
                        }

                        this.list = list;
                    }
                }
            },
        },
    };
</script>
