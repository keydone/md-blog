/*
*  组件路径必须使用相对路径引入
*  如: ../views/index/index.vue
*/

const routes = [{
    path: '/softs',
    name: 'softs',
    component: () => import('../views/index/index.vue'),
}, {
    path: '/softs/detail',
    name: 'softs-detail',
    component: () => import('../views/details/details.vue'),
}];

export default routes;
