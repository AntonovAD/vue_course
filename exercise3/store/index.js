import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const helpers = {
  inCart: function (cartState, item) {
    return Boolean(
      Object.entries(
        cartState.list.find((cart) => cart.id === item.id) || {}
      ).length
    );
  },
  withCart: function (cartState, data) {
    if (cartState.list.length) {
      data.forEach((item) => {
        item.inCart = this.inCart(cartState, item);
      });
    }
    return data;
  },
};

const moduleList = {
  namespaced: true,
  state: {
    isFetching: true,
    header: [],
    data: [],
    config: {},
  },
  getters: {
    filtered: (state, getters, rootState) => {
      return Object.entries(state.config.filter || {}).reduce((result, [, value]) => {
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
      }, state.data.concat());
    },
    sorted: (state, getters, rootState) => {
      return getters.filtered.concat().sort((a,b) => {
        //TODO можно оптимизировать, но в рамках курса это не нужно
        const compareName = {
          0: 0,
          1: a.name.localeCompare(b.name),
          2: b.name.localeCompare(a.name),
        }[state.config.sort["Название"].count];

        const comparePrice = {
          0: 0,
          1: a.price-b.price,
          2: b.price-a.price,
        }[state.config.sort["Цена"].count];

        const compareCount = {
          0: 0,
          1: a.count-b.count,
          2: b.count-a.count,
        }[state.config.sort["Остаток"].count];

        const compareDict = {
          ["Название"]: compareName,
          ["Цена"]: comparePrice,
          ["Остаток"]: compareCount,
        };

        const comparePriority = Object.entries(state.config.sort).map(([key, value]) => {
          return {
            name: key,
            priority: value.priority,
          };
        });

        comparePriority.sort((a,b) => {
          return a.priority - b.priority;
        });

        return compareDict[comparePriority[0].name] || compareDict[comparePriority[1].name] || compareDict[comparePriority[2].name];
      });
    },
  },
  mutations: {
    setFetchStatus(state, value) {
      state.isFetching = value;
    },
    setData(state, data) {
      state.header = data.header;
      state.data = data.data;
      state.config = data.config;
    },
    setConfigFilter(state, {name, data, value}) {
      state.config.filter[name][data].value = value;
    },
    resetConfigSort(state) {
      Object.entries(state.config.sort).forEach(([key]) => {
        state.config.sort[key].count = 0;
        state.config.sort[key].priority = 0;
      });
      state.config.priority = 0;
    },
    setConfigSort(state, {name}) {
      if (!state.config.sort[name]) {
        console.warn(`undefined sort "${name}" in config`);
        return;
      }

      if (state.config.sort[name].count === 0) {
        state.config.priority++;
        state.config.sort[name].priority = state.config.priority;
      }

      state.config.sort[name].count = {
        0: 1,
        1: 2,
        2: 0,
      }[state.config.sort[name].count];

      if (state.config.sort[name].count === 0) {
        state.config.priority--;
        Object.entries(state.config.sort).map(([key, value]) => {
          state.config.sort[key].priority =
            state.config.sort[key].priority > state.config.sort[name].priority
              ? value.priority !== 0
              ? value.priority-1
              : 0
              : state.config.sort[key].priority
          ;
        });
        state.config.sort[name].priority = 0;
      }
    },
    resetConfigFilter(state) {
      Object.entries(state.config.filter).forEach(([key, value]) => {
        if (["default", "list"].includes(value.type)) {
          state.config.filter[key].data.value = undefined;
        } else if (value.type === "range") {
          state.config.filter[key].from.value = undefined;
          state.config.filter[key].to.value = undefined;
        } else {
          console.error(`unknown filter type: ${value.type}`);
        }
      });
    },
  },
  actions: {
    requestData(context, {}) {
      context.commit("setFetchStatus", true);

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
            count: 0,
            price: 1050,
          },
          {
            id: 8,
            name: "жесткий диск",
            category: "комплектующие",
            count: 5,
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

        context.commit("setData", {header, data, config});

        context.commit("setFetchStatus", false);
      }, 2000);
    },
    setConfigFilter(context, {name, data, value}) {
      context.commit("setConfigFilter", {name, data, value});
    },
    resetConfigSort(context, {}) {
      context.commit("resetConfigSort");
    },
    setConfigSort(context, {name}) {
      context.commit("setConfigSort", {name});
    },
    resetConfigFilter(context, {}) {
      context.commit("resetConfigFilter");
    },
  },
};

const moduleCart = {
  namespaced: true,
  state: {
    list: [],
    config: {},
  },
  getters: {
    cartItems: (state) => {
      return state.list.length;
    },
    cartTotalPrice: (state) => {
      return state.list.reduce((result, item) => {
        return result + (item.price * state.config[item.id].count);
      }, 0);
    },
  },
  mutations: {
    addToCart(state, {item}) {
      if (!helpers.inCart(state, item)) {
        if (item.count !== 0) {
          state.list.push(item);

          state.config[item.id] = {};
          state.config[item.id].count = 1;
        } else {
          console.warn(`item with id:${item.id} out of stock`);
        }
      } else {
        console.warn(`item with id:${item.id} already in cart`);
      }
    },
    delFromCart(state, {item}) {
      state.list = state.list.filter(list => list.id !== item.id);

      state.config[item.id] = {};
    },
    buyItems(state, {listState}) {
      let hasError = false;

      //сначала валидируем
      state.list.forEach((list) => {
        const itemIndex = listState.data.findIndex(item => item.id === list.id);

        if (itemIndex !== -1) {
          const config = state.config[list.id];

          if (config) {

            if (config.count) {
              const diff = listState.data[itemIndex].count - config.count;

              if (diff>=0) {
                //null;
              } else {
                hasError = true;
                console.error(`to much (${config.count}) item with id:${list.id} (${listState.data[itemIndex].count}) in cart`);
              }
            } else {
              hasError = true;
              console.error(`invalid count (${config.count}) of item with id:${list.id} in cart`);
            }
          } else {
            hasError = true;
            console.error(`invalid config of item with id:${list.id} in cart`);
          }
        } else {
          hasError = true;
          console.error(`undefined item with id:${list.id} in cart`);
        }
      });

      //потом покупаем
      if (!hasError) {
        state.list.forEach((list) => {
          const itemIndex = listState.data.findIndex(item => item.id === list.id);
          const config = state.config[list.id];
          listState.data[itemIndex].count -= config.count;
        });

        state.list = [];
        state.config = {};
      } else {
        console.error(`buy rejected`);
      }
    },
  },
  actions: {
    addToCart(context, {item}) {
      context.commit("addToCart", {item});
    },
    delFromCart(context, {item}) {
      context.commit("delFromCart", {item});
    },
    buyItems(context, {}) {
      context.commit("buyItems", {listState: context.rootState.list});
    },
  },
};

export default () => {
  return new Vuex.Store({
    strict: true,
    state: {},
    modules: {
      list: moduleList,
      cart: moduleCart,
    }
  });
};
