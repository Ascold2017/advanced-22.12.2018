import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMoment from 'vue-moment';
import moment from 'moment'

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

  if (expiredAt <= Date.now()) {
    // TODO - refresh token, then initApp
    initApp();
  }
  else {
    //store.commit(SET_TOKEN_DATA, { token, expiredAt });
    initApp();
  }
} else {
  initApp();
  // TODO - if no token - redirect to home page
  //window.location.href = '/';
}