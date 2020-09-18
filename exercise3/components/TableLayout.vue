<template>
  <div class="table-layout">
    <Loader v-if="isFetching"/>
    <fragment v-else>
      <TableFilter
        :filter="config.filter"
        :filterAction="tableFilterValueChange"
      />
      <TableList
        :list="data"
        :header="header"
        :headerAction="(item) => tableListHeaderValueClick(item.name)"
        :config="config"
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
    },
    methods: {
      tableFilterValueChange: function (name, data, value) {
        this.setConfigFilter(name, data, value);

        this.resetConfigSort();
      },
      tableListHeaderValueClick: function (name) {
        this.setConfigSort(name);
      },
    },
  }
</script>

<style scoped>
  .table-layout {
    display: flex;
    flex-direction: row;
  }
</style>
