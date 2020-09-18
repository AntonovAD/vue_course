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
    },
    computed: {
      filtered: function () {
        return Object.entries(this.config.filter).reduce((result, [, value]) => {
          return this.data.concat().filter((item) => {
            if (value.type === "range") {
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
        }, []);
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
      tableFilterValueChange: function () {
        //сбрасываем конфиг сортировки
        Object.entries(this.config.sort).forEach(([key]) => {
          this.config.sort[key].count = 0;
          this.config.sort[key].priority = 0;
        });
        this.config.priority = 0;
      },
      tableListHeaderValueClick: function (item) {
        //выставляем конфиг сортировки
        if (this.config.sort[item].count === 0) {
          this.config.priority++;
          this.config.sort[item].priority = this.config.priority;
        }

        this.config.sort[item].count = {
          0: 1,
          1: 2,
          2: 0,
        }[this.config.sort[item].count];

        if (this.config.sort[item].count === 0) {
          this.config.priority--;
          Object.entries(this.config.sort).map(([key, value]) => {
            this.config.sort[key].priority =
              this.config.sort[key].priority > this.config.sort[item].priority
                ? value.priority !== 0
                ? value.priority-1
                : 0
                : this.config.sort[key].priority
            ;
          });
          this.config.sort[item].priority = 0;
        }
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
