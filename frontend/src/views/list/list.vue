<template>
    <div class="wrapper">
        <!-- <ul class="toppic-card flex space-between mb20">
            <li class="flex-item">
                <router-link
                    class="entry-thumblink"
                    :to="{ name: 'details', query: { id: '00000000'}}"
                    :style="`background: url(${'n'}) no-repeat;`"
                >
                    标题标题标题标题标题标题标题标题
                </router-link>
            </li>
            <li class="flex-item">
                <router-link
                    class="entry-thumblink"
                    :to="{ name: 'details', query: { id: '00000000'}}"
                    :style="`background: url(${'n'}) no-repeat;`"
                >
                    标题标题标题标题标题标题标题标题
                </router-link>
            </li>
            <li class="flex-item">
                <router-link
                    class="entry-thumblink"
                    :to="{ name: 'details', query: { id: '00000000'}}"
                    :style="`background: url(${'n'}) no-repeat;`"
                >
                    标题标题标题标题标题标题标题标题
                </router-link>
            </li>
        </ul> -->

        <div class="toppic-cate mb20">
            <router-link :to="{ name: 'list' }">全部</router-link>
            <router-link :to="{ name: 'list', query: { cateid: '1' }}">效率</router-link>
            <router-link :to="{ name: 'list', query: { cateid: '2' } }">工具</router-link>
            <el-input
                class="toppic-search fr"
                placeholder="搜个啥呀..."
            >
                <span
                    slot="append"
                    class="slot-append"
                >
                    <i class="el-icon-search" />
                </span>
            </el-input>
        </div>

        <div class="toppic-list">
            <ul class="toppic-card flex space-between">
                <li
                    v-for="n in 4"
                    :key="n"
                >
                    <router-link
                        class="entry-thumblink"
                        :to="{ name: 'details', query: { id: '00000000'}}"
                        :style="`background: url(${n}) no-repeat;`"
                    />
                    <h2 class="entry-title">
                        <router-link
                            class="entry-link"
                            :to="{ name: 'details', query: { id: '00000000'}}"
                        >
                            标题标题标题标题标题标题标题标题
                        </router-link>
                    </h2>
                    <div class="entry-meta">
                        <time class="fl"><i class="el-icon-time" /> 2019-10-10 10:00:00</time>
                        <span class="views-count">
                            <i
                                class="el-icon-view"
                                title="阅读量"
                            />
                            100
                        </span>
                        <span class="comments-link">
                            <i
                                class="el-icon-chat-dot-round"
                                title="评论数"
                            />
                            100
                        </span>
                    </div>
                </li>
            </ul>

            <ul class="toppic-card-3 flex space-between">
                <li>
                    <router-link to="/details" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="./list.js"></script>

<style lang="scss">
    .toppic {
        margin-left: -20px;
        .flex-item {
            @include flex-item;
        }
    }
    .toppic-search {
        width: 270px;
        margin: 7px 10px 0 20px;
        .el-input-group__append {
            padding: 0;
            width: 42px;
            text-align: center;
        }
        .slot-append {
            height: 36px;
            line-height: 36px;
            display: block;
            cursor: pointer;
        }
    }
    .toppic-cate {
        background: #fff;
        border-radius: 3px;
        border-bottom: 1px solid $border-color-lighter;
        a {
            height: 54px;
            line-height: 54px;
            color: #9b9b9b;
            padding: 0 16px;
            position: relative;
            &:after {
                content: "";
                width: 0;
                height: 1px;
                background: #292525;
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                transition: width 0.2s;
            }
            &:hover {
                color: #292525;
                &:after {
                    width: 100%;
                }
            }
        }
        .router-link-active {
            color: #292525;
        }
    }
    .toppic-card {
        margin-left: -20px;
        li {
            @include flex-item;
        }
        .entry-thumblink {
            height: 230px;
            display: block;
            background-size: cover !important;
            transition: background-color 0.2s;
            &:hover {
                background-color: #999 !important;
            }
        }
        .entry-title {
            font-size: 16px;
            line-height: 20px;
            padding-top: 10px;
            height: 50px;
        }
        .entry-link {
            padding: 0 20px;
            @include text-overflow(2);
        }
        .entry-meta {
            font-size: 13px;
            padding: 15px 20px;
            color: $color-text-second;
            text-align: right;
        }
    }
</style>
