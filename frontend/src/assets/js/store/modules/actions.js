import * as types from '@js/const/mutationTypes';

const actions = {
    [types.UPDATE_USER]({ commit }) {
        commit([types.UPDATE_USER]);
    },
};

export default actions;
