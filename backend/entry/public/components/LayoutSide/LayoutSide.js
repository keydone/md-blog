import { mapState } from 'vuex';
import menuTemp from './MenuTemp.vue';
import ls from '@bjs/storage/localstorage';
import { lsAsideCollapsedKey } from '@bjs/const/consts';

export default {
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
        this.isCollapsed = ls.get(lsAsideCollapsedKey);

        this.$bus.$on('collapseChanged', (asideCollapsed) => {
            this.isCollapsed = asideCollapsed;
            ls.set(lsAsideCollapsedKey, asideCollapsed);
        });
    },
};
