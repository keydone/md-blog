<template>
    <div class="notfound">
        <div class="pic-404">
            <img
                src="../assets/images/404.png"
                class="bg_404"
            >
            <img
                src="../assets/images/404_cloud.png"
                class="cloud_404 left"
            >
            <img
                src="../assets/images/404_cloud.png"
                class="cloud_404 middle"
            >
            <img
                src="../assets/images/404_cloud.png"
                class="cloud_404 right"
            >
        </div>
        <div class="text-404">
            <div class="text__item notfound__oops">OOPS!</div>
            <div class="text__item notfound__info">版权所有 ©️Claude.wu</div>
            <div class="text__item notfound__headline">无法访问该地址</div>
            <div class="text__item notfound__info">请检查你的地址是否有误, 或点击下方按钮返回首页</div>
            <el-button
                class="text__item notfound__home"
                type="primary"
                @click="back"
            >
                返回首页
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.replace({ name: 'index' });
        },
    },
};
</script>

<style lang="scss">
    @keyframes cloudLeft {
        0% {
            top: 17px;
            left: 220px;
            opacity: 0;
        }

        20% {
            top: 33px;
            left: 188px;
            opacity: 1;
        }

        80% {
            top: 81px;
            left: 92px;
            opacity: 1;
        }

        to {
            top: 97px;
            left: 60px;
            opacity: 0;
        }
    }

    @keyframes cloudMid {
        0% {
            top: 10px;
            left: 420px;
            opacity: 0;
        }

        20% {
            top: 40px;
            left: 360px;
            opacity: 1;
        }

        70% {
            top: 130px;
            left: 180px;
            opacity: 1;
        }

        to {
            top: 160px;
            left: 120px;
            opacity: 0;
        }
    }

    @keyframes cloudRight {
        0% {
            top: 100px;
            left: 500px;
            opacity: 0;
        }

        20% {
            top: 120px;
            left: 460px;
            opacity: 1;
        }

        80% {
            top: 180px;
            left: 340px;
            opacity: 1;
        }

        to {
            top: 200px;
            left: 300px;
            opacity: 0;
        }
    }

    @keyframes slideUp {
        0% {
            transform: translateY(30px);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .notfound {
        margin: 0 auto;
        max-width: 1000px;
        padding: 100px 0;
        overflow: hidden;
        .pic-404 {
            float: left;
            width: 610px;
            position: relative;
        }
        .cloud_404 {
            opacity: 0;
            position: absolute;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
            &.left {
                width: 80px;
                top: 17px;
                left: 220px;
                animation-name: cloudLeft;
                animation-delay: 1s;
            }
            &.middle {
                width: 46px;
                top: 10px;
                left: 420px;
                animation-name: cloudMid;
                animation-delay: 1.2s;
            }
            &.right {
                width: 62px;
                top: 100px;
                left: 500px;
                animation-name: cloudRight;
                animation-delay: 1s;
            }
        }

        .text__item {
            opacity: 0;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        .notfound__oops,
        .notfound__headline {
            font-weight: bold;
        }
        .notfound__oops {
            font-size: 32px;
            color: #1482f0;
            line-height: 40px;
            margin-bottom: 20px;
        }
        .notfound__headline {
            color: #222;
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 10px;
            animation-delay: 0.1s;
        }
        .notfound__info {
            font-size: 13px;
            line-height: 21px;
            color: grey;
            margin-bottom: 30px;
            animation-delay: 0.2s;
        }
        .notfound__home {
            border-radius: 20px;
            animation-delay: 0.3s;
        }
    }
</style>
