import { mapState } from 'vuex';
import menuTemp from './MenuTemp.vue';
import ls from '@bjs/storage/localstorage';
import { lsAsideCollapsedKey } from '@bjs/const/consts';

export default {
    inject: ['refresh'],
    data() {
        return {
            isCollapsed:  false,
            activeIndex:  '0-0',
            defaultOpens: [],
        };
    },
    components: {
        menuTemp,
    },
    computed: {
        ...mapState({
            menuList: state => state.base.menuList,
        }),
    },
    watch: {
        '$route.path'(newValue) {
            this.activeIndex = newValue;
        },
    },
    created() {
        const currentIndex = this.$route.meta.index;

        this.activeIndex = this.$route.path;
        this.defaultOpens = [currentIndex.substring(0, 1), currentIndex];

        // 左侧菜单折叠状态
        this.isCollapsed = ls.get(lsAsideCollapsedKey);

        this.$bus.$on('collapseChanged', (asideCollapsed) => {
            this.isCollapsed = asideCollapsed;
            ls.set(lsAsideCollapsedKey, asideCollapsed);
        });
    },
    methods: {
        menuSelected(index) {
            if (index === this.$route.path) {
                // 刷新当前路由
                this.$nextTick(() => {
                    this.refresh();
                });
            }
        },
    },
};
