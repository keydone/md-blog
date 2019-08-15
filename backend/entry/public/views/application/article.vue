<template>
    <div class="wrapper article">
        <h3 class="el-card__header">文章列表</h3>

        <div class="el-card__body">
            <el-form inline>
                <el-form-item label="文章标题">
                    <el-input
                        v-model="form.title"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="文章ID">
                    <el-input
                        v-model="form._id"
                        placeholder="支持精确搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input
                        v-model="form.author"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-select
                        v-model="form.searchType"
                        placeholder="全部"
                        autocomplete="on"
                    >
                        <el-option
                            label="全部"
                            value="username"
                        />
                        <el-option
                            label="已发布"
                            value="userid"
                        />
                        <el-option
                            label="待审核"
                            value="userid"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-form>

            <base-table
                ref="table"
                :http="[getArticles]"
                :delete-api="deleteArticle"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                />
                <el-table-column
                    prop="title"
                    label="标题"
                />
                <el-table-column
                    prop="subtitle"
                    label="副标题"
                />
                <el-table-column
                    prop="author"
                    label="作者"
                />
                <el-table-column label="内容">
                    <template slot-scope="scope">{{ scope.row.text.substring(0, 100) }}...</template>
                </el-table-column>
                <el-table-column
                    prop="postDate"
                    label="发布时间"
                />
                <el-table-column
                    prop="recommandBlocks"
                    label="推荐板块"
                />
                <el-table-column
                    prop="role"
                    label="阅读权限"
                />
                <el-table-column
                    prop="categoryId"
                    label="分类"
                />
                <el-table-column
                    prop="tags"
                    label="标签"
                />
                <el-table-column
                    prop="isDraft"
                    label="是否为草稿"
                />
                <el-table-column
                    prop="tags"
                    label="编辑"
                    width="100"
                    fixed="right"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="showEditDialog=true;"
                        >
                            编辑
                        </el-button>
                        <div class="pt10">
                            <el-button
                                type="danger"
                                @click="deleteThis(scope.row._id)"
                            >
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </base-table>
        </div>
    </div>
</template>

<script>
    import { getArticles, deleteArticle } from '@bjs/common/services';

    export default {
        data() {
            return {
                getArticles,
                deleteArticle,
                form: {
                    _id:    '',
                    title:  '',
                    author: '',
                },
                rules: {},
            };
        },
        methods: {
            // 删除文章
            deleteThis(id) {
                this.$refs.table.deleteThis(id);
            },
        },
    };
</script>
