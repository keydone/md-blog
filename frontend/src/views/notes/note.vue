<template>
    <div class="wrapper note-section">
        <h3 class="wrapper-title">发布笔记</h3>
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
            <el-form-item
                class="post-stars"
                label="推荐星级"
            >
                <el-rate v-model="postStars" />
            </el-form-item>
        </el-form>

        <div class="editor-wrapper">
            <el-switch
                v-model="markdown"
                active-text="Markdown"
                inactive-text="富文本编辑器"
                @change="changeEditor"
            />
            <!-- Markdown -->
            <mavon-editor
                v-show="markdown"
                v-model="content"
            />
            <!-- 富文本编辑器 -->
            <tinymce
                v-show="!markdown"
                ref="tinymce"
            />
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
                            <label class="el-label">笔记分类</label>
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
                            <label class="el-label">笔记标签</label>
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
    import {
        saveNotes,
        getCategories,
        saveCategory,
        getTags,
        saveTags,
    } from '@js/common/services';

    const tinymce = () => import('@comp/Tinymce/Tinymce.vue');

    export default {
        components: {
            tinymce,
        },
        data () {
            return {
                id:          '',
                title:       '😝',
                subtitle:    '',
                author:      'kkk',
                authorId:    '',
                markdown:    true,
                postDate:    +new Date(),
                postStars:   null,
                readlimit:   '100',
                content:     '',
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
        created () {
            this.getTags();
            this.getCategories();
        },
        methods: {
            // 切换编辑器
            changeEditor() {
                if(this.markdown) {
                    this.content = this.$refs.tinymce.getContent();
                } else {
                    this.$refs.tinymce.setContent({ content: this.content });
                }
            },
            // 发布
            async post ($event, isDraft) {
                let content = '', text = '';

                if(this.markdown) {
                    content = this.content;
                } else {
                    content = this.$refs.tinymce.getContent();
                    text = this.$refs.tinymce.getContent({ format: 'text' });
                }

                if (this.title === '') {
                    return this.$message.error('标题不能为空!');
                } else if (content === '') {
                    return this.$message.error('内容不能为空!');
                }

                const { code, msg } = await this.$http(saveNotes, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        _id:        this.id,
                        title:      this.title,
                        readlimit:  this.readlimit,
                        subtitle:   this.subtitle,
                        author:     this.author || '匿名用户',
                        categoryId: this.categoryId,
                        indexBlock: this.indexBlock,
                        authorId:   this.authorId,
                        postDate:   this.postDate,
                        stars:      this.stars,
                        tags:       this.tags,
                        isDraft,
                        content,
                        text,
                    },
                });

                if (code === 0) {
                    this.$message.success(msg);

                    this.title = '';
                    this.content = '';
                }
            },
            handleChange () { },
            // 获取分类
            async getCategories () {
                const { code, data } = await this.$http(getCategories, {
                    data: {},
                });

                if (code === 0) {
                    this.categories = data.list || [];
                }
            },
            // 保存分类
            async saveCategory () {
                const { code, data } = await this.$http(saveCategory, {
                    data: {},
                });

                if (code === 0) {
                    console.log(data);
                }
            },
            // 获取标签
            async getTags () {
                const { code, data } = await this.$http(getTags);

                if (code === 0) {
                    this.tagList = data.list || [];
                }
            },
            // 保存标签
            async saveTags () {
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
    .note-section {
        padding: 20px;
        max-width: 1200px;
        display: block;
        margin: 0 auto;
        background: #fff;
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
        .editor-wrapper{
            border-top: 1px dashed #e0e0e0;
            padding-top: 20px;
            .el-switch{
                display: block;
                margin: 0 0 20px auto;
                width: 220px;
            }
        }
        .v-note-wrapper{
            height: 600px;
            position: relative;
            z-index: 1;
        }
        .post-options {
            text-align: right;
            .el-collapse {
                margin: 30px 0;
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
