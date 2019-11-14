import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import './assets/css/common.less';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

