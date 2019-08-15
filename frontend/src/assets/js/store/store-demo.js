import * as types from './mutationTypes';

/**
 * 默认数据
 */
const state = {
    userInfo: {},
    isLogin: null, // null: 未登录 true: 已登录 false: 过期
};

/**
 * getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
 */
const getters = {
    isLogin(state) {
        return state.isLogin;
    },
};

// 异步更新
const actions = {
    [types.UPDATE_USER]({ commit }) {
        commit([types.UPDATE_USER]);
    },
};

// 同步更新
const mutations = {
    [types.UPDATE_USER](state, { userInfo, isLogin }) {
        state.userInfo = userInfo;
        state.isLogin = isLogin;
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
};
