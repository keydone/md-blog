/*!
 * @author claude
 * date 07/05/2019
 * 公共 store
 */

import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
});
