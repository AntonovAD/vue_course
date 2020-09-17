import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    strict: true,
    state: {
      currentTab: 0,
    },
    mutations: {
      setCurrentTab(state, index) {
        state.currentTab = index;
      },
    },
    actions: {
      setCurrentTab(context, {index}) {
        context.commit("setCurrentTab", index);
      },
    },
    modules: {}
  });
}
