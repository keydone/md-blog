<template>
    <div class="article-detail">
        <section class="section-block detail-container">
            <div class="crumb-nav">
                <router-link to="/">首页</router-link>
                <router-link to="/">分类列表</router-link>
                正文部分
            </div>
            <div class="article-header">
                <h1 class="big-title">标题标题标题</h1>
                <div class="article-meta">
                    <div class="meta-block">
                        <i class="el-icon" />
                        发布相对时间
                    </div>
                    <div class="meta-block">
                        <i class="el-icon" />
                        <router-link to="/">分类, 分类, 分类</router-link>
                    </div>
                    <div class="meta-block">
                        <i class="el-icon" />
                        评论数
                    </div>
                    <div class="meta-block">
                        <i class="el-icon" />
                        收藏
                    </div>
                </div>
            </div>

            <div class="article-main">
                article-main 文章主体
            </div>

            <div class="article-footer">
                <div class="article-copyright">
                    article-copyright
                </div>

                <div class="article-action">
                    <div class="support-btn">
                        点赞(数量+1)
                    </div>
                </div>
            </div>

            <!-- 上下篇 -->
            <div class="paging-footer">
                <div class="paging-prev">
                    <i class="el-icon-prev" />
                    标题
                </div>
                <div class="paging-next">
                    <i class="el-icon-next" />
                    标题
                </div>
            </div>
        </section>

        <!-- 相关推荐 -->
        <section class="section-block article-about">
            <h3>相关推荐</h3>
            <ul>
                <li>相关推荐</li>
                <li>相关推荐</li>
                <li>相关推荐</li>
                <li>相关推荐</li>
            </ul>
        </section>

        <!-- 评论区 -->
        <section class="section-block people-says">
            <h3>授人以鱼</h3>
            <el-form
                id="commit-user"
                v-model="form"
                inline
            >
                <el-form-item>
                    <el-input placeholder="邮箱地址" />
                    <el-select v-model="select">
                        <el-option
                            v-for="item in select"
                            :key="item.value"
                            :value="item.value"
                        />
                    </el-select>
                    <el-input placeholder="没有我的邮箱" />
                </el-form-item>

                <el-form-item>
                    <el-input placeholder="昵称" />
                </el-form-item>
                <textarea
                    id="commit"
                    name="commits"
                    cols="30"
                    rows="10"
                    placeholder="给后面的人留块面包吧"
                />
            </el-form>

            <!-- 评论列表 -->
            <div class="comments-list">
                <ul class="comments-list">
                    <li>comments-list</li>
                    <li>comments-list</li>
                    <li>comments-list</li>
                    <li>comments-list</li>
                    <li>comments-list</li>
                </ul>
                <el-button>加载更多</el-button>
            </div>
        </section>
    </div>
</template>

<script src="./details.js"></script>

<style module>
	@import "./details.scss";
</style>
