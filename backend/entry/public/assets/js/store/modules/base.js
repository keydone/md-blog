import { lsTagsKey } from '@bjs/const/consts';
import ls from '@bjs/storage/localstorage';
import * as types from '../mutationTypes';

// 数据状态
const state = {
    // user:          {},
    token:         '',
    sysCode:       '',
    userInfo:      {},
    menuList:      [], // 左侧导航菜单
    btnPermission: [], // 按钮权限
    isLogin:       null, // null: 未登录 true: 已登录 false: 过期
    tagsList:      [],
};

/**
 * getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
 */
const getters = {
    // user:          state => state.user,
    token:         state => state.token,
    sysCode:       state => state.sysCode,
    isLogin:       state => state.isLogin,
    userInfo:      state => state.userInfo,
    menuList:      state => state.menuList,
    btnPermission: state => state.btnPermission,
};

/**
 * mutations 同步修改 state
 */

const mutations = {
    [types.UPDATE_USER](state, data) {
        // state.user = data; // 备用
        state.token = data.token;
        state.sysCode = data.sysCode;
        state.userInfo = data.userInfo;
        state.isLogin = state.token ? true : (state.token == null ? null : false);
    },
    [types.UPDATE_MENUS](state, { menuList, btnPermission }) {

        if (menuList) {
            const recursionMenu = (menuList, parentIndex = -1, parentPath) => {
                menuList.forEach((item, index) => {
                    item.index = parentIndex >= 0 ? `${parentIndex}-${index}` : `${index}`;
                    item.meta.index = item.index;

                    if (parentPath != null) {
                        item.$path = item.path === '' ? parentPath : `${parentPath}/${item.path}`;
                    } else {
                        item.$path = item.path;
                    }

                    if (item.children) {
                        recursionMenu(item.children, index, item.path);
                    }
                });

                return menuList;
            };

            state.menuList = recursionMenu(menuList);
            state.btnPermission = btnPermission;
        } else {
            state.menuList = [];
            state.btnPermission = [];
        }
    },
    // 快捷标签
    [types.UPDATE_TAGSLIST](state, { type, data }) {
        const policy = {
            // 全部删除
            all() {
                ls.set(lsTagsKey, []);
                state.tagsList = [];
            },
            // 部分删除
            indexes() {
                for (let i = 0; i < state.tagsList.length; i++) {
                    state.tagsList[i].delete = false;
                    for (let j = 0; j < data.length; j++) {
                        const element = data[j];

                        if (i === element) {
                            state.tagsList[i].delete = true;
                        }
                    }
                }

                for (let i = 0; i < state.tagsList.length; i++) {
                    if (state.tagsList[i].delete) {
                        state.tagsList.splice(i, 1);
                        i--;
                    }
                }
            },
            // 新增
            set() {
                ls.set(lsTagsKey, data);
                state.tagsList = data;
            },
        };

        policy[type]();
    },
};

/**
 * 异步变更 state
 */
const actions = {
    [types.UPDATE_USER]({ commit }) {
        // 执行异步操作先

        // 同步更新 store
        commit([types.UPDATE_USER]);
    },
};

export default {
    actions,
    getters,
    mutations,
    state,
};
