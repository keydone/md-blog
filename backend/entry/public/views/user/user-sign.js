import { userSigned } from '@bjs/common/services';

export default {
    data() {
        return {
            userSigned,
            columns: [],
            form:    {
                username:   '',
                searchType: 'username',
            },
        };
    },
    created() {
        this.$nextTick(() => {
            // console.log(this.$root.scrollbar);
        });
    },
    methods: {
        editData(row) {
            console.log(row);

        },

    },
};
