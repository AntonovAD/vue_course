<template>
  <div class="table-layout">
    <Loader v-if="isFetching"/>
    <fragment v-else>
      <TableFilter
        :data="origin"
        :filter="config.filter"
        :filterAction="tableFilterValueChange"
        :filterResetAction="tableFilterReset"
      />
      <TableList
        :list="data"
        :header="header"
        :headerAction="(item) => tableListHeaderValueClick(item.name)"
        :config="config"
        :controlButtons="[
          {
            title(item) {
              return item.inCart ? 'Добавлено' : 'В корзину';
            },
            action(item) {
              tableListItemBuyClick(item);
            },
            color(item) {
              return item.inCart ? '#3b8070' : undefined;
            }
          }
        ]"
      />
    </fragment>
  </div>
</template>

<script>
  import Vue from "vue";
  import Loader from "./Loader";
  import TableList from "./TableList";
  import TableFilter from "./TableFilter";
  import Fragment from 'vue-fragment';
  Vue.use(Fragment.Plugin);

  export default {
    name: 'TableLayout',
    components: {
      TableFilter,
      TableList,
      Loader,
    },
    props: {
      isFetching: Boolean,
      header: {
        default: () => ([]),
        type: Array
      },
      origin: Array,
      data: {
        default: () => ([]),
        type: Array
      },
      config: {
        default: () => ({}),
        type: Object
      },
      setConfigFilter: {
        default: () => {},
        type: Function
      },
      resetConfigSort: {
        default: () => {},
        type: Function
      },
      setConfigSort: {
        default: () => {},
        type: Function
      },
      addToCart: {
        default: () => {},
        type: Function
      },
      resetListConfigFilter: {
        default: () => {},
        type: Function
      },
    },
    methods: {
      tableFilterValueChange: function (name, data, value) {
        this.setConfigFilter(name, data, value);

        this.resetConfigSort();
      },
      tableListHeaderValueClick: function (name) {
        this.setConfigSort(name);
      },
      tableListItemBuyClick: function (item) {
        this.addToCart(item);
      },
      tableFilterReset: function () {
        this.resetListConfigFilter();
      }
    },
  }
</script>

<style scoped>
  .table-layout {
    display: flex;
    flex-direction: row;
  }
</style>
