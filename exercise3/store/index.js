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
            if (["default", "list"].includes(value.type)) {
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
          //TODO можно оптимизировать, но в рамках курса это не нужно
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

          const compareCount = {
            0: 0,
            1: a.count-b.count,
            2: b.count-a.count,
          }[state.list.config.sort["Остаток"].count];

          const compareDict = {
            ["Название"]: compareName,
            ["Цена"]: comparePrice,
            ["Остаток"]: compareCount,
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

          return compareDict[comparePriority[0].name] || compareDict[comparePriority[1].name] || compareDict[comparePriority[2].name];
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
        if (!state.list.config.sort[name]) {
          console.warn(`undefined sort "${name}" in config`);
          return;
        }

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
      },
      resetListConfigFilter(state) {
        Object.entries(state.list.config.filter).forEach(([key, value]) => {
          if (["default", "list"].includes(value.type)) {
            state.list.config.filter[key].data.value = undefined;
          } else if (value.type === "range") {
            state.list.config.filter[key].from.value = undefined;
            state.list.config.filter[key].to.value = undefined;
          } else {
            console.error(`unknown filter type: ${value.type}`);
          }
        });
      },
    },
    actions: {
      requestList(context, {}) {
        context.commit("listIsFetching", true);

        setTimeout(() => {
          const header = [
            {
              name: "Название",
              ref: "name",
            },
            {
              name: "Категория",
              ref: "category",
            },
            {
              name: "Остаток",
              ref: "count",
            },
            {
              name: "Цена",
              ref: "price",
            },
          ];
          const data = [
            {
              id: 1,
              name: "материнка",
              category: "комплектующие",
              count: 10,
              price: 6210,
            },
            {
              id: 2,
              name: "проц",
              category: "комплектующие",
              count: 3,
              price: 8730,
            },
            {
              id: 11,
              name: "монитор",
              category: "периферия",
              count: 2,
              price: 10300,
            },
            {
              id: 3,
              name: "видюха",
              category: "комплектующие",
              count: 10,
              price: 4540,
            },
            {
              id: 4,
              name: "видюха",
              category: "комплектующие",
              count: 8,
              price: 7100,
            },
            {
              id: 12,
              name: "клава",
              category: "периферия",
              count: 10,
              price: 2350,
            },
            {
              id: 5,
              name: "бп",
              category: "комплектующие",
              count: 10,
              price: 2080,
            },
            {
              id: 13,
              name: "мышь",
              category: "периферия",
              count: 7,
              price: 1750,
            },
            {
              id: 14,
              name: "коврик",
              category: "периферия",
              count: 10,
              price: 2050,
            },
            {
              id: 6,
              name: "корпус",
              category: "периферия",
              count: 10,
              price: 5600,
            },
            {
              id: 7,
              name: "двд-ром",
              category: "комплектующие",
              count: 5,
              price: 1050,
            },
            {
              id: 8,
              name: "жесткий диск",
              category: "комплектующие",
              count: 10,
              price: 3400,
            },
            {
              id: 9,
              name: "звуковая",
              category: "комплектующие",
              count: 10,
              price: 3250,
            },
            {
              id: 10,
              name: "оператива",
              category: "комплектующие",
              count: 10,
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
              },
              ["Категория"]: {
                type: "list",
                ref: "category",
                data: {
                  placeholder: "Категория",
                  value: undefined,
                },
              },
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
              ["Остаток"]: {
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
      resetListConfigFilter(context, {}) {
        context.commit("resetListConfigFilter");
      }
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
