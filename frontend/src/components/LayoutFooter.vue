<template>
    <footer :class="['base-footer', {loaded: loaded}]">
        <section class="footer-top">
            <div class="footer-container flex">
                <div class="site-logo">
                    <img
                        class="logo-img"
                        src="../assets/images/logo.png"
                        alt="logo"
                    >
                </div>
                <div class="footer-intro flex">
                    <div
                        v-for="block in footerblocks"
                        :key="block._id"
                        class="footer-top__item"
                    >
                        <h3 class="item-title">{{ block.title }}</h3>
                        <ul class="item-content">
                            <li
                                v-for="item in block.list"
                                :key="item._id"
                                class="li-item"
                            >
                                <a
                                    target="_blank"
                                    :href="item.link"
                                >{{ item.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="offical-payways flex">
                    <div class="footer-top__item">
                        <h3 class="item-title">官方微信</h3>
                        <div class="item-img">
                            <img src="../assets/images/logo.png">
                        </div>
                    </div>
                    <div class="footer-top__item">
                        <h3 class="item-title">官方支付宝</h3>
                        <div class="item-img">
                            <img src="../assets/images/logo.png">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="footer-container friendlinks">
            <template v-for="item in friendlinks">
                <a
                    :key="item._id"
                    :href="item.link"
                    target="_blank"
                >{{ item.name }}</a>
            </template>
        </div>

        <section class="footer-bottom">
            <div class="footer-container clearfix">
                <p class="footer-copyright fl">
                    版权 © 2017 All Right Reserved, 由 <a
                        href="https://koa.bootcss.com/"
                        target="_blank"
                    >Koa</a> 强力驱动 | 备案/许可证号：<a href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action">粤ICP备18059825号-1</a>
                </p>
                <ul class="footer__social-network fr">
                    <li class="social__item">
                        <a
                            target="_blank"
                            href="https://github.com/keydone"
                            title="github"
                        ><i class="icon el-icon-setting" /></a>
                    </li>
                    <li class="social__item">
                        <a
                            target="_blank"
                            href="k754708625@gmail.com"
                            title="email"
                        ><i class="icon el-icon-setting" /></a>
                    </li>
                </ul>
            </div>
        </section>
    </footer>
</template>

<script>
    import { getFooterBlock, getFriendLinks } from '@js/common/services';

    export default {
        data() {
            return {
                loaded:       false,
                footerblocks: [],
                friendlinks:  [],
            };
        },
        async created() {
            this.getFooterBlock();
            this.getFriendLinks();
            setTimeout(() => {
                this.loaded = true;
            }, 200);
        },
        methods: {
            async getFooterBlock() {
                const { code, data } = await this.$http(getFooterBlock);

                if (code === 0) {
                    if (data.list.length) {
                        this.footerblocks = data.list;
                    }
                }
            },
            async getFriendLinks() {
                const { code, data } = await this.$http(getFriendLinks);

                if (code === 0) {
                    if (data.list.length) {
                        this.friendlinks = data.list;
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
    .base-footer {
        &.loaded {
            opacity: 1;
        }
        opacity: 0;
        margin-top: 30px;
        box-shadow: 0 -5px 6px #ccc;
        background: url(../assets/images/TB1_1680x370.png) no-repeat 50% 0 #2e323f;
        background-size: cover;
        color: #fff;
    }
    .footer-container {
        max-width: 1440px;
        margin: 0 auto;
        .site-logo {
            width: 150px;
            padding: 20px;
            margin-right: 20px;
            border-right: 1px dashed rgba(255, 255, 255, 0.1);
        }
    }
    .footer-intro {
        width: 540px;
        border-right: 1px dashed rgba(255, 255, 255, 0.1);
    }
    .footer-top__item {
        padding: 0 20px;
        flex: 1;
        .item-title {
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .item-img {
            width: 100px;
            margin-left: -15px;
        }
        .li-item {
            margin-bottom: 10px;
        }
    }
    .footer-top {
        padding: 30px 0;
    }
    .friendlinks {
        padding: 10px 0;
        line-height: 30px;
        text-align: center;
        border-top: 1px dashed rgba(255, 255, 255, 0.1);
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        a {
            margin: 0 10px;
            color: $color-primary-light;
            &:hover {
                color: $color-primary;
            }
        }
    }
    .offical-payways {
        width: 300px;
        margin: 0 50px;
    }
    .footer-bottom {
        font-size: 13px;
        line-height: 24px;
        padding: 10px 50px;
    }
    .footer__social-network {
        .social__item {
            @include inline-block;
        }
    }
</style>
