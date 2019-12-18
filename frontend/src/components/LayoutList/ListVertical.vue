<template>
    <ul class="list-component">
        <li class="list-item posr">
            <div class="list-item-main">
                <div class="list-item-meta">
                    <div class="list-item-meta-avatar">
                        <image src="../../assets/images/404.png" />
                    </div>
                    <div class="list-item-meta-title">
                        <router-link :to="{name: 'notes'}">title</router-link>
                    </div>
                </div>
                <div class="list-item-content mb20">content</div>
                <ul class="list-item-action flex">
                    <li>
                        <i class="el-icon-favor" /> 10
                    </li>
                    <li>
                        <i class="el-icon-like" /> 20
                    </li>
                    <li>
                        <i class="el-icon-comments" /> 5
                    </li>
                </ul>
            </div>

            <div class="list-item-extra">
                <image src="../../assets/images/404.png" />
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            col: {
                type:    Number,
                default: 1,
            },
        },
    };
</script>

<style lang="scss">
    .list-item {
        border-top: 1px solid #e8e8e8;
        padding: 15px 350px 15px 15px;
        height: 180px;
        border-radius: 5px;
        border: 1px solid #eee;
        background: #fff;
        margin-bottom: 20px;
        .list-item-meta{
            margin-bottom: 15px;
            white-space: nowrap;
        }
        .list-item-meta-avatar{
            width: 40px;
            height: 40px;
            margin-right: 15px;
            display: inline-block;
            vertical-align: top;
        }
        .list-item-meta-title{
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            line-height: 24px;
            height: 50px;
            width: 100%;
            white-space: normal;
            a{
                display: inline-block;
                @include text-overflow(2);
            }
        }
        .list-item-content{
            height: 42px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.65);
            @include text-overflow(2);
        }
        .list-item-action{
            margin-left: -16px;
            li{padding:0 16px;
                cursor: pointer;
                border-left: 1px solid #e8e8e8;
                &:first-child{border-left: 0;}
            }
        }
        .list-item-extra{
            position: absolute;
            top: 15px;
            right: 15px;
            width: 300px;
            height: 150px;
        }
    }
</style>
