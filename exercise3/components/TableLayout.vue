<template>
  <div class="table-layout">
    <Loader v-if="isFetching"/>
    <fragment v-else>
      <TableFilter
        :filter="config.filter"
        :filterAction="tableFilterValueChange"
      />
      <TableList
        :list="sorted"
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
    computed: {
      filtered: function () {
        return Object.entries(this.config.filter).reduce((result, [, value]) => {
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
        }, this.data.concat());
      },
      sorted: function () {
        return this.filtered.concat().sort((a,b) => {
          const compareName = {
            0: 0,
            1: a.name.localeCompare(b.name),
            2: b.name.localeCompare(a.name),
          }[this.config.sort["Название"].count];

          const comparePrice = {
            0: 0,
            1: a.price-b.price,
            2: b.price-a.price,
          }[this.config.sort["Цена"].count];

          const compareDict = {
            ["Название"]: compareName,
            ["Цена"]: comparePrice
          };

          const comparePriority = Object.entries(this.config.sort).map(([key, value]) => {
            return {
              name: key,
              priority: value.priority,
            };
          });

          comparePriority.sort((a,b) => {
            return a.priority - b.priority;
          });

          return compareDict[comparePriority[0].name] || compareDict[comparePriority[1].name];
        });
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
