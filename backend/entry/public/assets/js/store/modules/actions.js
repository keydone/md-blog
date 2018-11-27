import * as types from '@bjs/const/mutationTypes';

const actions = {
    [types.UPDATE_USER]({ commit }) {
        commit([types.UPDATE_USER]);
    },
};

export default actions;
