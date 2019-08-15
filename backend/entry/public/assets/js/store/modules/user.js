import * as types from '../mutationTypes';

// 数据状态
const state = {
    userInfo: {},
    isLogin: null, // null: 未登录 true: 已登录 false: 过期
    menuList: [], // 左侧导航菜单
    btnCtrols: [], // 按钮权限
};

/**
 * getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
 */
const getters = {
    isLogin(state) {
        return state.isLogin;
    },
    userInfo(state) {
        return state.userInfo;
    },
    menuList(state) {
        return state.menuList;
    },
    btnCtrols(state) {
        return state.btnCtrols;
    },
};

/**
 * mutations 同步修改 state
 */

const mutations = {
    [types.UPDATE_USER](state, { userInfo, isLogin }) {
        state.userInfo = userInfo;
        state.isLogin = isLogin;
    },
    [types.UPDATE_MENUS](state, { menuList, btnCtrols }) {
        state.menuList = menuList;
        state.btnCtrols = btnCtrols;
    },
};

/**
 * 异步变更 state
 */
const actions = {
    [types.UPDATE_USER]({ commit }) {
        commit([types.UPDATE_USER]);
    },
};

export default {
    actions,
    getters,
    mutations,
    state,
};
