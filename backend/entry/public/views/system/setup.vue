<template>
    <div class="wrapper setup__wrapper">
        <h3 class="el-card__header">系统设置</h3>

        <div class="el-card__body">
            <el-form
                ref="form"
                class="short-input"
                label-width="120px"
                :model="form"
                :rules="rules"
            >
                <el-form-item
                    label="网站名称"
                    prop="siteName"
                >
                    <el-input
                        v-model="form.siteName"
                        placeholder="自定义网站名称, 用于各处文档标题"
                    />
                </el-form-item>
                <el-form-item
                    label="网站域名"
                    prop="siteAddress"
                >
                    <el-input
                        v-model="form.siteAddress"
                        placeholder="自定义网站域名, 仅用于各处文档标题"
                    />
                </el-form-item>
                <el-form-item
                    label="资源缓存时长"
                    prop="cacheLong"
                >
                    <el-input
                        v-model="form.cacheLong"
                        placeholder="自定义网站资源缓存时长, 如图片等"
                    />
                    <span class="form-tip">(单位: 分钟)</span>
                </el-form-item>
                <el-form-item
                    label="最大文件上传"
                    prop="maxUpload"
                >
                    <el-input
                        v-model="form.maxUpload"
                        placeholder="允许网站最大上传的文件大小"
                    />
                    <strong>MB</strong>
                    <span class="form-tip">(提示: 1M = 1024 KB)</span>
                </el-form-item>
                <el-form-item
                    label="上传文件类型"
                    prop="typesOfUpload"
                >
                    <el-input
                        v-model="form.typesOfUpload"
                        placeholder="允许网站上传的文件类型后缀名, 如 png, gif等"
                    />
                    <span class="form-tip">(多种格式使用 | 隔开, 如: png|gif|jpg|jpeg|zip|rar)</span>
                </el-form-item>
                <el-form-item
                    label="META关键词"
                    prop="metas"
                >
                    <el-input
                        v-model="form.metas"
                        placeholder="有利于 SEO 优化, 多个关键词用英文逗号 , 隔开"
                    />
                    <span class="form-tip">(多个用 , 隔开, 如: MAC, 设计)</span>
                </el-form-item>
                <el-form-item label="网站浅色 logo">
                    <el-input
                        v-model="form.sitelogo_light"
                        placeholder="logo 地址"
                    />
                </el-form-item>
                <el-form-item label="网站深色 logo">
                    <el-input
                        v-model="form.sitelogo_dark"
                        placeholder="logo 地址"
                    />
                </el-form-item>
                <el-form-item label="官方支付宝">
                    <el-input
                        v-model="form.aliQR"
                        placeholder="支付宝二维码地址"
                    />
                </el-form-item>
                <el-form-item label="官方微信">
                    <el-input
                        v-model="form.wxQR"
                        placeholder="微信二维码地址"
                    />
                </el-form-item>
                <el-form-item
                    class="nospace"
                    label="页脚板块"
                >
                    <el-card
                        v-for="(item, index) in footblocks"
                        :key="index"
                        class="inline-card"
                    >
                        <div
                            slot="header"
                            class="clearfix"
                        >
                            <template v-if="!item.edit">
                                {{ item.title }}
                            </template>
                            <template v-else>
                                <input
                                    v-model="item.title"
                                    placeholder="板块标题"
                                    class="item-title_input el-input__inner"
                                >
                            </template>

                            <div class="fr">
                                <el-button
                                    type="text"
                                    @click="toggleState(item)"
                                >
                                    {{ item.edit ? '取消': '编辑' }}
                                </el-button>
                                <el-button
                                    type="text"
                                    class="text-danger"
                                    @click="deleteBlock(index, item._id)"
                                >
                                    删除
                                </el-button>
                            </div>
                        </div>
                        <div
                            v-for="(value, key) in item.list"
                            :key="key"
                            class="text-item"
                        >
                            <p v-if="!item.edit">{{ value.name }}</p>
                            <template v-else>
                                <el-input
                                    v-model="value.name"
                                    placeholder="标题"
                                >
                                    <span slot="prepend">标题</span>
                                </el-input>
                                <el-input
                                    v-model="value.link"
                                    placeholder="跳转链接"
                                >
                                    <span slot="prepend">链接</span>
                                </el-input>
                            </template>
                        </div>

                        <div
                            v-if="item.edit"
                            class="flex mt10"
                        >
                            <el-button
                                size="small"
                                class="flex_1"
                                @click="addFooterBlock(index)"
                            >
                                添加链接
                            </el-button>

                            <el-button
                                type="primary"
                                size="small"
                                class="flex_1"
                                @click="saveFooterBlock($event, index, item._id)"
                            >
                                保存
                            </el-button>
                        </div>
                    </el-card>

                    <div
                        class="addblocks inline"
                        @click="addblocks"
                    >
                        <i class="el-icon-plus" />
                    </div>
                </el-form-item>
                <el-form-item label="友链">
                    <ul
                        v-for="(item, index) in friendlinks"
                        :key="index"
                        class="friendlinks"
                    >
                        <li>
                            <el-input v-model.trim="item.name">
                                <span slot="prepend">名称</span>
                            </el-input>
                            <el-input v-model.trim="item.link">
                                <span slot="prepend">地址</span>
                            </el-input>
                            <span
                                title="添加"
                                class="links-btn"
                                @click="addlinks"
                            >
                                <i class="el-icon-plus" />
                            </span>
                            <span
                                v-if="friendlinks.length > 1"
                                class="links-btn"
                                title="删除"
                                @click="removelinks(index, item._id)"
                            >
                                <i class="el-icon-minus" />
                            </span>
                            <span
                                class="links-btn"
                                :title="item.show ? '已显示' : '已隐藏'"
                                @click="saveFriendLinks(index, item, !item.show)"
                            >
                                <i
                                    v-if="item.show"
                                    class="el-icon-open"
                                />
                                <i
                                    v-else
                                    class="el-icon-turn-off"
                                />
                            </span>
                            <span
                                title="保存"
                                class="links-btn"
                                @click="saveFriendLinks(index, item)"
                            >
                                <i class="el-icon-sort" />
                            </span>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="页脚版权信息">
                    <el-input
                        v-model="form.copyright"
                        placeholder="页面底部版权信息, 支持 html"
                        type="textarea"
                        maxlength="500"
                        show-word-limit
                        rows="3"
                    />
                </el-form-item>
                <el-button
                    type="primary"
                    class="setup-submit"
                    @click="saveSetup"
                >
                    保存
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        getSiteSetup,
        saveSiteSetup,
        getFooterBlock,
        saveFooterBlock,
        deleteFooterBlock,
        getFriendLinks,
        saveFriendLinks,
        deleteFriendLinks,
    } from '@bjs/common/services';

    export default {
        data() {
            return {
                form: {
                    siteName:       'siteName',
                    siteAddress:    'siteAddress',
                    cacheLong:      5, // 分钟
                    maxUpload:      20, // 20MB
                    sitelogo_light: 'http://',
                    sitelogo_dark:  'http://',
                    aliQR:          'http://',
                    wxQR:           'http://',
                    metas:          'MAC, 设计',
                    typesOfUpload:  'png|gif|jpg|jpeg|zip|rar',
                    copyright:
                        '版权 © 2019 - 2020, All Right Reserved, 由Koa强力驱动.',
                },
                footblocks: [
                    /* {title: '关于我们',
                                    list:  [{name: '关于我们',},
                                    {name: '免责与版权',},],
                                    },
                                    {title: 'FAQ',
                                    name: '成为会员',
                                    name: '售后服务',
                                    ],}, {
                                    title: '我是雷锋',
                                    name: '有奖投稿',
                                    name: '成为版主',
                                    name: '广告合作',],
                                    title: '问题解决',
                                    name: '如何安装',
                                    name: '如何下载', */
                ],
                friendlinks: [
                    {
                        _id:  '',
                        name: '',
                        link: '',
                        show: true,
                    },
                ],
                rules: {
                    siteName: [
                        {
                            required: true,
                        },
                    ],
                },
            };
        },
        created() {
            this.getSetup();
            this.getFooterBlock();
            this.getFriendLinks();
        },
        methods: {
            async getSetup() {
                const { code, data } = await this.$http(getSiteSetup);

                if (code === 0) {
                    if (data) {
                        this.form = {
                            ...data,
                            cacheLong: data.cacheLong / 1000 / 60,
                            maxUpload: data.maxUpload / 1024 / 1024,
                        };
                    }
                }
            },
            async saveSetup($event) {
                await this.$http(saveSiteSetup, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        ...this.form,
                        cacheLong: (this.form.cacheLong || 5) * 60 * 1000,
                        maxUpload: (this.form.maxUpload || 20) * 1024 * 1024,
                    },
                });
            },
            toggleState(item) {
                item.edit = !item.edit;
            },
            async getFooterBlock() {
                const { code, data } = await this.$http(getFooterBlock);

                if (code === 0) {
                    if (data.list.length) {
                        this.footblocks = data.list;
                        this.footblocks.forEach((item, index) => {
                            this.$set(this.footblocks, index, {
                                edit: false,
                                ...item,
                            });
                        });
                    }
                }
            },
            addFooterBlock(index) {
                this.footblocks[index].list.push({
                    name: '',
                    link: '',
                });
            },
            async saveFooterBlock($event, index, id) {
                const { code, data } = await this.$http(saveFooterBlock, {
                    btnState: {
                        target: $event,
                    },
                    data: this.footblocks[index],
                });

                if (code === 0) {
                    this.$set(this.footblocks, index, {
                        ...data,
                        edit: false,
                    });
                }
            },
            addblocks() {
                this.footblocks.push({
                    edit:  true,
                    title: '',
                    list:  [
                        {
                            name: '',
                            link: '',
                        },
                    ],
                });
            },
            // 删除板块
            deleteBlock(index, id) {
                const vm = this;

                vm.$confirm('确定要删除这条数据吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '删除',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(deleteFooterBlock, {
                                    data: {
                                        id,
                                    },
                                });

                                if (code === 0) {
                                    vm.footblocks.splice(index, 1);
                                }
                                instance.confirmButtonLoading = false;
                            } else {
                                vm.footblocks.splice(index, 1);
                            }
                        }
                    },
                });
            },
            async getFriendLinks() {
                const { code, data } = await this.$http(getFriendLinks);

                if (code === 0) {
                    if (data.list.length) {
                        this.friendlinks = data.list;
                    }
                }
            },
            // 添加友链
            addlinks() {
                this.friendlinks.push({
                    _id:  '',
                    name: '',
                    link: '',
                    show: true,
                });
            },
            removelinks(index, id) {
                const vm = this;

                vm.$confirm('确定要删除这条数据吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '删除',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(deleteFriendLinks, {
                                    data: {
                                        id,
                                    },
                                });

                                if (code === 0) {
                                    vm.friendlinks.splice(index, 1);
                                }
                                instance.confirmButtonLoading = false;
                            } else {
                                vm.friendlinks.splice(index, 1);
                            }
                        }
                    },
                });
            },
            async saveFriendLinks(index, item, toggleState) {
                if (item.name === '') {
                    return this.$message.error('友链名称 不能为空!');
                } else if (item.link === '') {
                    return this.$message.error('友链地址 不能为空!');
                }

                const { code, data, msg } = await this.$http(saveFriendLinks, {
                    data: {
                        ...item,
                        creatorId: '',
                        show:      toggleState == null ? true : toggleState,
                    },
                });

                if (code === 0) {
                    this.$set(this.friendlinks, index, data);
                    if (toggleState != null) {
                        this.$message.success(
                            `友链已${data.show ? '显示' : '隐藏'}`
                        );
                    } else {
                        this.$message.success(msg);
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
    .setup__wrapper {
        .form-tip {
            font-size: 12px;
            color: $color-text-third;
        }
        .el-textarea {
            .el-textarea__inner {
                padding: 10px;
            }
        }
        .inline-card {
            width: 300px;
            font-size: 14px;
            margin: 0 20px 20px 0;
            @include inline-block;
            .el-card__header {
                padding: 0 20px;
            }
            .el-card__body {
                min-height: auto;
                line-height: 30px;
                padding: 10px 20px 20px;
            }
            .item-title_input {
                width: 150px;
                height: 28px;
                line-height: 28px;
            }
            .el-input {
                margin-top: 10px;
            }
        }
        .addblocks {
            width: 300px;
            height: 130px;
            font-size: 50px;
            line-height: 130px;
            margin-right: 20px;
            text-align: center;
            border: 1px dashed #ccc;
            border-radius: $border-radius * 2;
            color: $color-text-third;
            cursor: pointer;
            &:hover {
                color: $color-main;
            }
        }
        .friendlinks {
            li {
                position: relative;
                margin-bottom: 10px;
            }
            .el-input-group {
                width: 300px;
                margin-right: 20px;
            }
            .links-btn {
                width: 40px;
                height: 38px;
                line-height: 38px;
                margin-left: 10px;
                border-radius: 4px;
                text-align: center;
                border: 1px dashed $color-text-disabled;
                color: $color-text-third;
                @include inline-block;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                    color: $color-primary;
                    border-color: $color-primary;
                }
            }
        }
        .setup-submit {
            width: 150px;
            margin-left: 120px;
        }
    }
</style>
