import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMoment from 'vue-moment';
import moment from 'moment';
import { SET_TOKEN_DATA } from '@admin/store/actions/auth';
require('moment/locale/ru');
moment.locale('ru');
Vue.use(VueMoment, {moment});

const initApp = () => {
    Vue.config.productionTip = false;
    new Vue({
      el: "#admin-app",
      router,
      store,
      render: h => h(App)
    });
}

const tokenData = localStorage.getItem('token_data');

if (tokenData) {
  const { token, expired_at: expiredAt } = JSON.parse(tokenData);
  store.commit(SET_TOKEN_DATA, { token, expiredAt });
  initApp();

} else {
  initApp();
  // TODO - if no token - redirect to home page
  //window.location.href = '/';
}