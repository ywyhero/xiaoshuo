import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOver: [
      {
        id: 0,
        name: '全部',
      },
      {
        id: 1,
        name: '连载中',
      }, {
        id: 2,
        name: '已完结',
      },
    ],
    like: [
      {
        id: 1,
        name: '男生频道',
      }, {
        id: 2,
        name: '女生频道',
      },
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
