import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    strict: true,
    state: {
      list: {
        isFetching: true,
        header: [],
        data: [],
        config: {},
      },
      cart: {
        list: [],
      },
    },
    getters: {
      filtered: (state) => {
        return store.helpers.withCart(state, Object.entries(state.list.config.filter || {}).reduce((result, [, value]) => {
          return result.filter((item) => {
            if (value.type === "default") {
              const filterMatch =
                (value.data.value !== undefined
                  && value.data.value !== null
                  && value.data.value !== "")
                  ? item[value.ref].indexOf(value.data.value)+1
                  : true
              ;

              return filterMatch;
            } else if (value.type === "range") {
              const filterFrom =
                (value.from.value !== undefined
                  && value.from.value !== null
                  && value.from.value !== "")
                  ? item[value.ref] >= value.from.value
                  : true
              ;

              const filterTo =
                (value.to.value !== undefined
                  && value.to.value !== null
                  && value.to.value !== "")
                  ? item[value.ref] <= value.to.value
                  : true
              ;

              return filterFrom && filterTo;
            } else {
              console.error(`unknown filter type: ${value.type}`);
              return true;
            }
          });
        }, state.list.data.concat()));
      },
      sorted: (state, getters) => {
        return store.helpers.withCart(state, getters.filtered.concat().sort((a,b) => {
          const compareName = {
            0: 0,
            1: a.name.localeCompare(b.name),
            2: b.name.localeCompare(a.name),
          }[state.list.config.sort["Название"].count];

          const comparePrice = {
            0: 0,
            1: a.price-b.price,
            2: b.price-a.price,
          }[state.list.config.sort["Цена"].count];

          const compareDict = {
            ["Название"]: compareName,
            ["Цена"]: comparePrice
          };

          const comparePriority = Object.entries(state.list.config.sort).map(([key, value]) => {
            return {
              name: key,
              priority: value.priority,
            };
          });

          comparePriority.sort((a,b) => {
            return a.priority - b.priority;
          });

          return compareDict[comparePriority[0].name] || compareDict[comparePriority[1].name];
        }));
      },
      cartItems: (state) => {
        return state.cart.list.length;
      }
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
      addToCart(state, {item}) {
        if (!store.helpers.inCart(state, item) ) {
          state.cart.list.push(item);
        } else {
          console.warn(`item with id:${item.id} already in cart`);
        }
      }
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
              name: "Цена",
            },
          ];
          const data = [
            {
              id: 1,
              name: "материнка",
              price: 6210,
            },
            {
              id: 2,
              name: "проц",
              price: 8730,
            },
            {
              id: 3,
              name: "видюха",
              price: 4540,
            },
            {
              id: 4,
              name: "видюха",
              price: 7100,
            },
            {
              id: 5,
              name: "бп",
              price: 2080,
            },
            {
              id: 6,
              name: "корпус",
              price: 5600,
            },
            {
              id: 7,
              name: "двд-ром",
              price: 1050,
            },
            {
              id: 8,
              name: "жесткий диск",
              price: 3400,
            },
            {
              id: 9,
              name: "звуковая",
              price: 3250,
            },
            {
              id: 10,
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
      addToCart(context, {item}) {
        context.commit("addToCart", {item});
      },
    },
    modules: {}
  });

  store.helpers = {};

  store.helpers.inCart = (state, item) => {
    return Boolean(
      Object.entries(
        state.cart.list.find((cart) => cart.id === item.id) || {}
      ).length
    );
  };

  store.helpers.withCart = (state, data) => {
    if (state.cart.list.length) {
      return data.map((item) => {
        return {
          ...item,
          inCart: store.helpers.inCart(state, item)
        };
      });
    } else {
      return data;
    }
  };

  return store;
};
