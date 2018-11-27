/*
*  组件路径必须使用相对路径引入
*  如: ../views/index/index.vue
*/

const routes = [{
    path: '/weconfig',
    name: 'weconfig-index',
    component: () => import('../views/index/index.vue'),
}, {
    path: '/weconfig/list',
    name: 'weconfig-list',
    component: () => import('../views/list/list.vue'),
}];

export default routes;
