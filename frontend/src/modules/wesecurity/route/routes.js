/*
*  组件路径必须使用相对路径引入
*  如: ../views/index/index.vue
*/

const routes = [{
    path: '/wesecurity',
    name: 'wesecurity-index',
    component: () => import('../views/index/index.vue'),
}];

export default routes;
