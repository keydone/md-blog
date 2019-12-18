<template>
    <aside class="main-aside">
        <div class="aside-container">
            <div
                v-if="adlist.length"
                class="side-block notice-banner"
            >
                <el-carousel
                    slot="content-slot"
                    class="imgbanner"
                    animation="fade"
                    height="135px"
                >
                    <el-carousel-item
                        v-for="index in 3"
                        :key="index"
                        :speed="300"
                    >
                        <router-link :to="{ name: 'details' }">
                            <img
                                src="../../assets/images/adguard.png"
                                class="notice-img"
                            >
                        </router-link>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <!-- 站内搜索 -->
            <div class="side-block">
                <h3 class="sideblock-title">站内搜索</h3>
                <div class="sideblock-box">
                    <div class="search-for">
                        <el-input
                            v-model.trim="keywords"
                            prefix-icon="el-icon-search"
                            placeholder="包罗万象 (回车即搜)"
                            @keydown.native.13="search"
                        >
                            <el-dropdown
                                v-if="history.length"
                                slot="append"
                            >
                                <span class="el-dropdown-link">
                                    <i class="el-icon-time" />
                                </span>
                                <el-dropdown-menu
                                    slot="dropdown"
                                    class="search-dropdown"
                                >
                                    <el-dropdown-item
                                        v-for="(item, index) in history"
                                        :key="index"
                                        command="item"
                                    >
                                        {{ item }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-input>
                    </div>
                    <!-- <div class="statistics">
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
                    <div class="text-center">
                        <el-button>投稿</el-button>
                        <el-button type="primary">打赏</el-button>
                    </div> -->
                </div>
            </div>

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
            <div
                v-if="newest.length"
                class="side-block"
            >
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
            <div
                v-if="tags.length"
                class="side-block"
            >
                <h3 class="sideblock-title">
                    热门标签
                    <router-link
                        class="more-link"
                        to="/"
                    >
                        查看更多<i class="el-icon-arrow-right" />
                    </router-link>
                </h3>
                <ul class="sideblock-box sideblock-tags">
                    <li
                        v-for="(tag, index) in tags"
                        :key="tag._id"
                    >
                        <router-link
                            v-if="tag.show"
                            :class="`tagcolor_${index % 10}`"
                            :to="{ name: 'list', query: { tagid: tag._id } }"
                        >
                            {{ tag.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
    import { getTags } from '@js/common/services';

    export default {
        components: {},
        props:      {},
        data() {
            return {
                keywords: '',
                adlist:   [],
                newest:   [],
                tags:     [],
                history:  [],
            };
        },
        created() {
            this.getTags();
        },
        methods: {
            async getTags() {
                const { code, data } = await this.$http(getTags);

                if (code === 0) {
                    this.tags = data.list || [];
                }
            },
            search() {
                if(this.keywords.length) {
                    this.$router.push({
                        name:  'search',
                        query: {
                            keywords: this.keywords,
                        },
                    });
                }
            },
        },
    };
</script>

<style lang="scss">
    @import "./LayoutSide.scss";
</style>
