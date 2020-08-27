<template>
  <div id="app">
    <Loader v-if="isFetching"/>
    <Table
      v-else
      :list="sorted"
      :header="header"
      :headerOnClick="tableListHeaderValueClick"
      :filter="config.filter"
      :filterChange="tableFilterValueChange"
      :config="config"
    />
  </div>
</template>

<script>
import Table from "./components/Table";
import Loader from "./components/Loader";

export default {
  name: 'App',
  components: {
    Loader,
    Table,
  },
  data: function() {
    return {
      timeout: 2000,
      isFetching: true,
      header: [],
      data: [],
      filtered: [],
      sorted: [],
      config: {},
    }
  },
  methods: {
    tableFilterValueChange: function (key) {
      this.filtered = this.data.concat().filter((item) => {
        const filterFrom =
          (this.config.filter[key].from.value !== undefined
            && this.config.filter[key].from.value !== null
            && this.config.filter[key].from.value !== "")
            ? item.price >= this.config.filter[key].from.value
            : true
        ;

        const filterTo =
          (this.config.filter[key].to.value !== undefined
            && this.config.filter[key].to.value !== null
            && this.config.filter[key].to.value !== "")
            ? item.price <= this.config.filter[key].to.value
            : true
        ;

        return filterFrom && filterTo;
      });

      Object.entries(this.config.sort).forEach(([key]) => {

        this.config.sort[key].count = 0;
        this.config.sort[key].priority = 0;
      });
      this.config.priority = 0;
      this.sorted = this.filtered.concat();
    },
    tableListHeaderValueClick: function (item) {
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

      this.sorted = this.filtered.concat().sort((a,b) => {
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
  mounted: function () {
    this.isFetching = true;

    setTimeout(() => {
      this.header = [
        {
          name: "Название",
        },
        {
          name: "Цена"
        },
      ];
      this.data = [
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
      this.filtered = this.data.concat();
      this.sorted = this.data.concat();
      this.config = {
        filter: {
          ["Цена"]: {
            type: "range",
            from: {
              placeholder: "Цена от",
              type: "number",
              value: undefined,
            },
            to: {
              placeholder: "Цена до",
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

      this.isFetching = false;
    }, this.timeout);
  }
}
</script>

<style>
  body {
    font-family: "Courier New", serif;
    margin: 20px
  }
  #app {
    display: flex;
    flex-direction: row;
  }
</style>
