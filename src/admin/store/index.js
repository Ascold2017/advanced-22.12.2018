import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import about from './modules/about';
import blog from './modules/blog';
import notification from './modules/notification';
import auth from './modules/auth';

const store = new Vuex.Store({
    modules: {
        about,
        blog,
        notification,
        auth
    },
});

export default store;