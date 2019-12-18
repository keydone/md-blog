<template>
    <div class="toppic-cate mb20">
        <router-link :to="{ name: 'list' }">全部</router-link>
        <router-link :to="{ name: 'list', query: { cateid: '1' }}">效率</router-link>
        <router-link :to="{ name: 'list', query: { cateid: '2' } }">工具</router-link>
        <el-input
            v-model="keywords"
            class="toppic-search fr"
            placeholder="搜个啥呀..."
            :clearable="true"
            @keydown.native.13="search"
        >
            <span
                slot="append"
                class="slot-append"
                @click="search"
            >
                <i class="el-icon-search" />
            </span>
        </el-input>
    </div>
</template>

<script>
    export default {
        props: {
            categories: {
                type:    Array,
                default: () => [],
            },
        },
        data() {
            return {
                keywords: '',
            };
        },
        methods: {
            search() {
                console.log(this.keywords);

                this.$emit('search', this.keywords);
            },
        },
    };
</script>

<style lang="scss">
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
</style>
