<template>
    <ul class="toppic-card flex space-between">
        <li
            v-for="n in col"
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
</template>

<script>
    export default {
        props: {
            col: {
                type:    Number,
                default: 4,
            },
        },
    };
</script>

<style lang="scss">
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
