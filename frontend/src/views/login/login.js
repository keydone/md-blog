import { mapState } from 'vuex';
import { baseLogin } from '@js/router/auth';
import { serviceLogin } from '@js/common/services';

export default {
    data() {
        return {
            form: {

            },
            rules: [{

            }],
        };
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
        }),
    },
    created() {

        console.log('isLogin:', this.isLogin);
        // console.log('store:', this.$store.getters);

    },
    methods: {
        async autoLogin() {
            // 请求接口
            const { code } = await serviceLogin({
                data: {

                },
            });

            // const code = 0;

            if (code === 0) {
                const isLogin = true;

                baseLogin(isLogin);

                // 跳转到首页
                this.$router.push({
                    name: 'index',
                });
            }


        },
    },
};
