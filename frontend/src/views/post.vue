<template>
    <div class="wrapper post-section">
        <h3 class="wrapper-title">发布文章</h3>
        <el-form
            label-width="80px"
            inline
        >
            <el-form-item
                class="big-title"
                label="标题"
            >
                <el-input
                    v-model="title"
                    placeholder="(必填)"
                />
            </el-form-item>

            <el-form-item
                class="sub-title"
                label="副标题"
            >
                <el-input
                    v-model="subtitle"
                    placeholder="(选填)"
                />
            </el-form-item>
            <el-form-item
                class="author"
                label="作者"
            >
                <el-input
                    v-model="author"
                    placeholder="(匿名用户)"
                />
            </el-form-item>
            <!-- <el-form-item
                class="post-date"
                label="发布时间"
            >
                <el-date-picker
                    v-model="postDate"
                    type="datetime"
                    class="post-date"
                    placeholder="选择日期时间"
                />
            </el-form-item> -->
            <el-form-item
                class="post-stars"
                label="推荐星级"
            >
                <el-rate v-model="postStars" />
            </el-form-item>
        </el-form>

        <tinymce ref="tinymce" />

        <!-- 资源下载 -->
        <div class="post-download">
            <el-form>
                <div
                    v-for="(item, index) in downloadUrls"
                    :key="index"
                    class="el-form-download"
                >
                    <el-form-item
                        label="版本/日期"
                        label-width="80px"
                    >
                        <el-input v-model="item.date" />
                    </el-form-item>
                    <el-form-item
                        label="资源下载"
                        label-width="80px"
                    >
                        <textarea
                            v-model="item.downloadUrl"
                            class="download-content"
                            placeholder="下载地址, 如网盘地址"
                        />
                    </el-form-item>
                    <i class="action-add">+</i>
                    <i class="action-minus">-</i>
                </div>
                <el-form-item
                    label="阅读权限"
                    label-width="80px"
                >
                    <el-select v-model="limits">
                        <el-option
                            v-for="item in limitSelect"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <div class="post-options posr">
            <el-collapse
                v-model="postOptions"
                @change="handleChange"
            >
                <el-collapse-item
                    title="更多选项"
                    name="1"
                >
                    <div class="flex">
                        <div class="flex-options">
                            <label class="el-label">文章分类</label>
                            <el-select v-model="categoryId">
                                <el-option
                                    v-for="item in categories"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
                        <div class="flex-options">
                            <label class="el-label">首页推荐</label>
                            <el-select
                                v-model="indexBlock"
                                placeholder="选择板块"
                            >
                                <el-option
                                    v-for="item in indexBlocks"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
                        <div class="flex-options">
                            <label class="el-label">文章标签</label>
                            <el-select
                                v-model="tags"
                                class="select-tags"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                            >
                                <el-option
                                    v-for="item in tagList"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                                />
                            </el-select>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>

            <el-button @click="post($event, 'draft')">存为草稿</el-button>
            <el-button
                type="primary"
                @click="post"
            >
                发布
            </el-button>
        </div>
    </div>
</template>

<script>
    import tinymce from '@comp/Tinymce/Tinymce.vue';
    import {
        articlePost,
        getCategories,
        saveCategory,
        getTags,
        saveTags,
    } from '@js/common/services';

    export default {
        components: {
            tinymce,
        },
        data() {
            return {
                id:           '',
                title:        '😝',
                subtitle:     '',
                author:       '凯子',
                authorId:     '',
                postDate:     +new Date(),
                postStars:    null,
                limits:       '100',
                downloadUrls: [
                    {
                        date:        '',
                        downloadUrl: '',
                    },
                ],
                postOptions: [],
                categories:  [],
                categoryId:  '',
                indexBlocks: [],
                indexBlock:  '',
                tagList:     [],
                tags:        [],
                limitSelect: [
                    {
                        label: '访客',
                        value: '100',
                    },
                    {
                        label: '会员可见',
                        value: '200',
                    },
                    {
                        label: '回复可见',
                        value: '300',
                    },
                ],
            };
        },
        created() {
            this.getTags();
            this.getCategories();
        },
        methods: {
            async post($event, isDraft) {
                const content = this.$refs.tinymce.getContent();
                const text = this.$refs.tinymce.getContent({ format: 'text' });

                if (this.title === '') {
                    return this.$message.error('标题不能为空!');
                } else if (content === '') {
                    return this.$message.error('内容不能为空!');
                }

                const { code, msg } = await this.$http(articlePost, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        _id:          this.id,
                        title:        this.title,
                        limits:       this.limits,
                        subtitle:     this.subtitle,
                        author:       this.author || '匿名用户',
                        downloadUrls: this.downloadUrls,
                        categoryId:   this.categoryId,
                        indexBlock:   this.indexBlock,
                        authorId:     this.authorId,
                        postDate:     this.postDate,
                        stars:        this.stars,
                        tags:         this.tags,
                        isDraft,
                        content,
                        text,
                    },
                });

                if (code === 0) {
                    this.$message.success(msg);

                    this.title = '';
                    this.$refs.tinymce.clearContent();
                }
            },
            handleChange() {},
            // 获取分类
            async getCategories() {
                const { code, data } = await this.$http(getCategories, {
                    data: {},
                });

                if (code === 0) {
                    this.categories = data.list || [];
                }
            },
            // 保存分类
            async saveCategory() {
                const { code, data } = await this.$http(saveCategory, {
                    data: {},
                });

                if (code === 0) {
                    console.log(data);
                }
            },
            // 获取标签
            async getTags() {
                const { code, data } = await this.$http(getTags);

                if (code === 0) {
                    this.tagList = data.list || [];
                }
            },
            // 保存标签
            async saveTags() {
                const { code, data } = await this.$http(saveTags, {
                    data: {},
                });

                if (code === 0) {
                    console.log(data);
                }
            },
        },
    };
</script>

<style lang="scss">
    .post-section {
        background: #fff;
        padding: 20px;
        .wrapper-title {
            padding: 15px;
            font-size: 20px;
            text-align: center;
        }
        .big-title,
        .sub-title {
            display: flex;
            .el-form-item__content {
                flex: 1;
            }
            .el-input__inner {
                border: 0;
                border-radius: 0;
                border-bottom: 1px solid #e0e0e0;
                &:focus {
                    border-bottom-color: #409eff;
                }
            }
        }
        .tinymce-container {
            min-height: 500px;
        }
        .post-download {
            padding-top: 20px;
            .el-form-item__label {
                text-align: left;
            }
        }
        .el-form-download {
            position: relative;
            padding-right: 100px;
            .el-form-item {
                margin-bottom: 10px;
            }
        }
        .action-add,
        .action-minus {
            position: absolute;
            top: 50%;
            width: 36px;
            height: 36px;
            line-height: 36px;
            border-radius: 50%;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            border: 1px solid #dcdfe6;
        }
        .action-add {
            right: 50px;
        }
        .action-minus {
            right: 5px;
        }
        .download-content {
            border: 1px solid #dcdfe6;
            border-radius: 5px;
            min-height: 50px;
            padding: 10px;
            width: 100%;
            resize: vertical;
        }
        .flex {
            .el-form-item {
                flex: 1;
            }
        }
        .post-stars {
            .el-form-item__content {
                padding-top: 10px;
            }
        }
        .post-options {
            text-align: right;
            .el-collapse {
                margin: 20px 0 30px;
            }
            .el-collapse-item__header {
                position: absolute;
                right: 0;
                top: -22px;
                height: 46px;
                line-height: 46px;
                padding-left: 10px;
                border-bottom: 0;
                &:hover {
                    color: #409eff;
                }
            }
            .el-collapse-item__content {
                padding: 20px 10px;
            }
            .flex-options {
                margin: 0 15px;
            }
            .el-label {
                line-height: 40px;
                margin-right: 10px;
            }
            .select-tags {
                width: 420px;
            }
        }
    }
</style>
