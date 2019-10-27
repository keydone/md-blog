import {
    Button,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Container,
    Checkbox,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DatePicker,
    Form,
    FormItem,
    Icon,
    Input,
    Loading,
    Message,
    MessageBox,
    Option,
    Pagination,
    Progress,
    Rate,
    Tag,
    Tabs,
    TabPane,
    Tooltip,
    Select,
    Switch,
    Upload,
} from 'element-ui';

const components = [
    Button,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Container,
    Checkbox,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DatePicker,
    Form,
    FormItem,
    Icon,
    Input,
    Option,
    Pagination,
    Progress,
    Rate,
    Tag,
    Tabs,
    TabPane,
    Tooltip,
    Select,
    Switch,
    Upload,
];

export default {
    install(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });

        Vue.use(Loading.directive);
        Vue.prototype.$message = Message;
        Vue.prototype.$loading = Loading.service;
        Vue.prototype.$confirm = MessageBox.confirm;
    },
};
