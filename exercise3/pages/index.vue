<template>
  <div class="container">
    <TableLayout
      :isFetching="isFetching"
      :header="header"
      :data="data"
      :config="config"
    />
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import TableLayout from "../components/TableLayout";

  export default {
    components: {
      TableLayout
    },
    data: function() {
      return {
        timeout: 2000,
        isFetching: true,
        header: [],
        data: [],
        config: {},
      }
    },
    methods: {
      isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      },
    },
    computed: {
      ...mapState([
        //проброс через массив строк
        'currentTab',
      ]),
      ...mapState({
        //проброс через функцию //currentTab: state => state.currentTab,
        //проброс через строку //currentTab: "currentTab",
      }),
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
        this.config = {
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

        this.isFetching = false;
      }, this.timeout);
    },
  }
</script>

<style scoped>
  .container {
    margin: 0 auto;
    padding: 20px;
    min-height: calc(100vh - 50px);
    display: flex;
  }
</style>
