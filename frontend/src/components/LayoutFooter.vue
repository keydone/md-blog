<template>
    <footer class="base-footer">
        <section class="footer-top">
            <div class="footer-container">
                <div class="footer-top__item">
                    <h3 class="item-title">关于</h3>
                    <div class="item-content">
                        <p class="item-text">本站是基于 koa 搭建的静态资源博客，主要用于分享日常学习、生活及工作的心得总结，欢迎品尝。</p>
                        <ul class="footer__contact-info">
                            <li class="contact-info__item"><i class="icon icon-location" /><span>广东深圳</span></li>
                            <li class="contact-info__item"><i class="icon icon-mail" /><span>k754708625@gmail.com</span></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-top__item">
                    <h3 class="item-title">友情链接</h3>
                    <div class="item-content">
                        <ul class="footer-top__list">
                            <li class="list-item">
                                <a
                                    target="_blank"
                                    href="##"
                                >hexo-theme-skapp</a>
                            </li>
                            <li class="list-item">
                                <a
                                    target="_blank"
                                    href="https://www.pandashen.com"
                                >PandaShen</a>
                            </li>
                            <li class="list-item">
                                <a
                                    target="_blank"
                                    href="http://www.wushaobin.top"
                                >twenty-four K</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer-top__item">
                    <h3 class="item-title">构建工具</h3>
                    <div class="item-content">
                        <ul class="footer-top__list">
                            <li class="list-item">
                                <a
                                    target="_blank"
                                    href="https://koa.bootcss.com/"
                                >Koa</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="footer-bottom">
            <div class="footer-container">
                <p class="footer-copyright">
                    主题 ©<a
                        href="https://github.com/Mrminfive/hexo-theme-skapp"
                        target="_blank"
                    >Skapp</a>2017, 由<a
                        class="main-color"
                        href="https://koa.bootcss.com/"
                        target="_blank"
                    >Koa</a>强力驱动.
                </p>
                <ul class="footer__social-network clearfix">
                    <li class="social-network__item">
                        <a
                            target="_blank"
                            href="https://github.com/keydone"
                            title="github"
                        ><i class="icon icon-github" /></a>
                    </li>
                    <li class="social-network__item">
                        <a
                            target="_blank"
                            href="k754708625@gmail.com"
                            title="email"
                        ><i class="icon icon-email" /></a>
                    </li>
                </ul>
            </div>
        </section>
    </footer>
</template>

<style lang="scss">
	.base-footer {
		margin-top: 30px;
		box-shadow: 0 -5px 6px #ccc;
		background-color: #242f35;
		color: #fff;
	}
	.footer-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.footer-top {
		padding: 60px 0 30px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	.footer-bottom {
		background-color: #2d383e;
		padding: 10px 0;
	}
</style>
