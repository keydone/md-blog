/**
 * mutations 同步修改 state
 */

import * as types from '@bjs/const/mutationTypes';

const mutations = {
    [types.UPDATE_USER](state, { userInfo, isLogin }) {
        state.userInfo = userInfo;
        state.isLogin = isLogin;
    },
};

export default mutations;
