<template>
    <div class="article wrapper">
        <h3 class="el-card__header">站内信</h3>

        <div class="el-card__body">
            <el-form inline>
                <el-form-item label="文章标题">
                    <el-input
                        v-model="form.username"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="文章ID">
                    <el-input
                        v-model="form.username"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input
                        v-model="form.username"
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

            <base-table :data="tableData" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form:      {},
                rules:     {},
                tableData: {},
            };
        },
    };
</script>
