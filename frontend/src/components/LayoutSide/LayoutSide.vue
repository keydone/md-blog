<template>
    <aside class="main-aside">
        <div class="aside-container">
            <div class="side-block notice-banner">
                <div class="imgbanner" />
                <div class="imgbanner" />
            </div>

            <!-- 站内搜索 -->
            <div class="side-block">
                <h3 class="sideblock-title">站内搜索</h3>
                <div class="sideblock-box">
                    <div class="search">
                        <input
                            type="text"
                            placeholder="包罗万象, 想你所想"
                        >
                    </div>
                    <div>资源总数</div>
                    <div>会员总数</div>
                    <div>投稿</div>
                    <div>打赏</div>
                </div>
            </div>

            <!-- 个人信息 -->
            <div class="side-block">
                <h3 class="sideblock-title">个人信息</h3>
                <div class="sideblock-box">
                    <div class="userProfile">登录查看</div>
                </div>
            </div>

            <!-- 最新文章 -->
            <div class="side-block">
                <h3 class="sideblock-title">最新文章</h3>
                <ul class="sideblock-box">
                    <li>
                        <div class="img">
                            <img src="">
                        </div>
                        <div class="detail">
                            <a href="##">标题</a>
                            <time>发布时间</time>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 热门标签 -->
            <div class="side-block">
                <h3 class="sideblock-title">热门标签</h3>
                <ul class="sideblock-box tags">
                    <li>热门</li>
                    <li>标签</li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script src="./LayoutSide.js"></script>

<style lang="scss">
	@import "./LayoutSide.scss";
</style>
