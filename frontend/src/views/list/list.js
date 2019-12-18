import { mapState } from 'vuex';

export default {
    data() {
        return {
            form: {

            },
            rules: {

            },
        };
    },
    computed: {
        ...mapState({
            isLogin: state => state.base.isLogin,
        }),
    },
    created() {

        console.log('isLogin:', this.isLogin);
        // console.log('store:', this.$store.getters);

    },
    methods: {
    },
};
