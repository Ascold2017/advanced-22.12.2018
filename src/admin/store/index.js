import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import about from './modules/about';
const store = new Vuex.Store({
    modules: {
        about
    },
});

export default store;