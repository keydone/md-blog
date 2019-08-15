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
                        <div class="post-avatar">
                            <img src="">
                        </div>
                        <span class="post-name">发表用户 admin</span>
                    </div>
                    <div class="meta-block">
                        <i class="el-icon" />
                        发布于: 发布相对时间
                    </div>
                </div>
            </div>

            <!-- 文章主体 -->
            <div
                class="article-main"
                :content="'article-main 文章主体'"
            />

            <!-- 文章版权 -->
            <div class="article-footer">
                <div class="article-copyright">
                    ! 如无特别注明, 本站所有文章均原创自 <router-link :to="{ name: 'index' }">站点</router-link>, 转载请注明来源: <router-link :to="{ name: 'index' }">http:xxx</router-link>
                </div>

                <div class="article-action">
                    <div class="cates-block">
                        <router-link to="/"># 分类</router-link>
                        <router-link to="/"># 分类</router-link>
                        <router-link to="/"># 分类</router-link>
                    </div>
                    <div class="action-metas">
                        <div class="meta-block">
                            <i class="el-icon" />
                            评论数
                        </div>
                        <div class="meta-block">
                            点赞(数量+1)
                        </div>
                        <div class="meta-block">
                            <i class="el-icon" />
                            收藏
                        </div>
                    </div>
                </div>
            </div>

            <!-- 上下篇 -->
            <div class="paging-footer">
                <div class="page-nav paging-prev">
                    <router-link to="">
                        <i class="el-icon el-icon-d-arrow-left" />
                        <span class="page-subtitle">上 1 篇标题篇标题篇标题篇标题篇标题篇标题篇标题篇标题</span>
                    </router-link>
                </div>
                <div class="page-nav paging-next">
                    <router-link to="">
                        <span class="page-subtitle">下 1 篇标题篇标题篇标题篇标题篇标题篇标题篇标题篇标题</span>
                        <i class="el-icon el-icon-d-arrow-right" />
                    </router-link>
                </div>
            </div>
        </section>

        <!-- 相关推荐 -->
        <section class="section-block article-recommend">
            <h3 class="section-title">相关推荐</h3>
            <ul class="recommend-list">
                <li
                    v-for="index in 6"
                    :key="index"
                    class="recommend-li"
                >
                    <router-link
                        class="article-link"
                        to="/"
                    >
                        相关推荐
                    </router-link>
                </li>
            </ul>
        </section>

        <!-- 评论区 -->
        <section class="section-block people-says">
            <h3 class="section-title">授人以鱼</h3>
            <el-form
                id="commit-user"
                v-model="form"
                label-width="80px"
                inline
            >
                <el-input
                    id="commit"
                    type="textarea"
                    name="commits"
                    :rows="5"
                    placeholder="给后面的人留块面包吧"
                />
                <el-form-item
                    class="padright"
                    label="邮箱地址:"
                >
                    <el-input
                        v-model="form.email"
                        placeholder="填写你的个人邮箱地址"
                    />
                    <el-dropdown
                        :show-timeout="0"
                        @command="handleCommand"
                    >
                        <span class="el-dropdown-link">
                            {{ select[0].value }}<i class="el-icon-arrow-down" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="item in select"
                                :key="item.value"
                                :command="item.value"
                            >
                                {{ item.value }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>

                <el-form-item label="昵称:">
                    <el-input placeholder="填写你的昵称" />
                </el-form-item>

                <div class="form-behavior">
                    <el-checkbox v-model="form.saveInfoChecked">记住邮箱和昵称, 下次评论免输入</el-checkbox>
                    <el-button
                        type="primary"
                        class="commit-submit"
                    >
                        提交
                    </el-button>
                </div>
            </el-form>

            <!-- 评论列表 -->
            <div class="comments-list">
                <ul class="comments-ul">
                    <li
                        v-for="item in 5"
                        :key="item"
                    >
                        <div class="user-avatar">
                            <img
                                src=""
                                class="img"
                            >
                        </div>
                        <div class="user-says">
                            <div class="user-info">
                                <router-view to="/aa">用户名</router-view>
                                <span class="tag">会员/游客</span>
                                <time>发表时间</time>
                            </div>
                            <div class="user-commit">用户留言用户留言用户留言用户留言用户留言用户留言 用户留言用户留言用户留言</div>
                            <div class="replay-action">
                                <el-button>弹窗回复</el-button>
                                <el-button>点赞</el-button>
                                <span class="floor">{{ item }} 楼</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <el-button class="load-more">加载更多</el-button>
            </div>
        </section>
    </div>
</template>

<script src="./details.js"></script>

<style module>
    @import "./details.scss";
</style>
