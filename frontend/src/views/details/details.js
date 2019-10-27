import { dateFormat } from '@js/utils/date';
import { getArticleDetails } from '@js/common/services';

export default {
    data() {
        return {
            dateFormat,
            form: {
                email:           '',
                saveInfoChecked: false,
            },
            select: [{
                label: '@163.com',
                value: '@163.com',
            }, {
                label: '@QQ.com',
                value: '@qq.com',
            }, {
                label: '@outlook.com',
                value: '@outlook.com',
            }, {
                label: '@gmail.com',
                value: '@gmail.com',
            }],
            prevItem: {},
            nextItem: {},
            details:  {},
        };
    },
    created() {
        this.getArticleDetails();
    },
    methods: {
        handleCommand(command) {
            console.log(command);

        },
        async getArticleDetails() {
            const { code, data } = await this.$http(getArticleDetails, {
                params: {
                    _id: this.$route.query.id,
                },
            });

            if (code === 0) {
                this.prevItem = data.prevItem;
                this.nextItem = data.nextItem;
                this.details = data.article;
            }
        },
    },
};
