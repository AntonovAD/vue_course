import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    strict: true,
    state: {
      list: {
        isFetching: true,
        header: [],
        data: [],
        config: {},
      },
      cart: {

      },
    },
    mutations: {
      listIsFetching(state, value) {
        state.list.isFetching = value;
      },
      setList(state, list) {
        state.list = {
          ...state.list,
          header: list.header,
          data: list.data,
          config: list.config
        }
      },
      setListConfigFilter(state, {name, data, value}) {
        state.list.config.filter[name][data].value = value;
      },
      resetListConfigSort(state) {
        Object.entries(state.list.config.sort).forEach(([key]) => {
          state.list.config.sort[key].count = 0;
          state.list.config.sort[key].priority = 0;
        });
        state.list.config.priority = 0;
      },
      setListConfigSort(state, {name}) {
        if (state.list.config.sort[name].count === 0) {
          state.list.config.priority++;
          state.list.config.sort[name].priority = state.list.config.priority;
        }

        state.list.config.sort[name].count = {
          0: 1,
          1: 2,
          2: 0,
        }[state.list.config.sort[name].count];

        if (state.list.config.sort[name].count === 0) {
          state.list.config.priority--;
          Object.entries(state.list.config.sort).map(([key, value]) => {
            state.list.config.sort[key].priority =
              state.list.config.sort[key].priority > state.list.config.sort[name].priority
                ? value.priority !== 0
                ? value.priority-1
                : 0
                : state.list.config.sort[key].priority
            ;
          });
          state.list.config.sort[name].priority = 0;
        }
      },
    },
    actions: {
      requestList(context, {}) {
        context.commit("listIsFetching", true);

        setTimeout(() => {
          const header = [
            {
              name: "Название",
            },
            {
              name: "Цена"
            },
          ];
          const data = [
            {
              name: "материнка",
              price: 6210,
            },
            {
              name: "проц",
              price: 8730,
            },
            {
              name: "видюха",
              price: 4540,
            },
            {
              name: "видюха",
              price: 7100,
            },
            {
              name: "бп",
              price: 2080,
            },
            {
              name: "корпус",
              price: 5600,
            },
            {
              name: "двд-ром",
              price: 1050,
            },
            {
              name: "жесткий диск",
              price: 3400,
            },
            {
              name: "звуковая",
              price: 3250,
            },
            {
              name: "оператива",
              price: 6210,
            },
          ];
          const config = {
            filter: {
              ["Название"]: {
                type: "default",
                ref: "name",
                data: {
                  placeholder: "Название",
                  type: "string",
                  value: undefined,
                },
              },
              ["Цена"]: {
                type: "range",
                ref: "price",
                from: {
                  placeholder: "Цена от",
                  type: "number",
                  value: undefined,
                },
                to: {
                  placeholder: "Цена до (lazy)",
                  type: "number",
                  value: undefined,
                },
              }
            },
            sort: {
              ["Название"]: {
                priority: 0,
                count: 0
              },
              ["Цена"]: {
                priority: 0,
                count: 0
              },
            },
            priority: 0,
          };

          context.commit("setList", {header, data, config});

          context.commit("listIsFetching", false);
        }, 2000);
      },
      setListConfigFilter(context, {name, data, value}) {
        context.commit("setListConfigFilter", {name, data, value});
      },
      resetListConfigSort(context, {}) {
        context.commit("resetListConfigSort");
      },
      setListConfigSort(context, {name}) {
        context.commit("setListConfigSort", {name});
      },
    },
    modules: {}
  });
}
