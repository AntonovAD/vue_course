<template>
  <div id="index" class="container">
    <div class="page-title">
      <h1>Список Товаров:</h1>
    </div>
    <TableLayout
      :isFetching="isFetching"
      :header="header"
      :origin="data"
      :data="sorted"
      :config="config"
      :cart="cart"
      :setConfigFilter="setConfigFilter"
      :resetConfigSort="resetConfigSort"
      :setConfigSort="setConfigSort"
      :addToCart="addToCart"
      :resetListConfigFilter="resetListConfigFilter"
    />
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import TableLayout from "../components/TableLayout";

  export default {
    components: {
      TableLayout
    },
    data: function() {
      return {
      }
    },
    methods: {
      requestList() {
        this.$store.dispatch("list/requestData", {});
      },
      setConfigFilter(name, data, value) {
        this.$store.dispatch("list/setConfigFilter", {name, data, value});
      },
      resetConfigSort() {
        this.$store.dispatch("list/resetConfigSort", {});
      },
      setConfigSort(name) {
        this.$store.dispatch("list/setConfigSort", {name});
      },
      addToCart(item) {
        this.$store.dispatch("cart/addToCart", {item});
      },
      resetListConfigFilter() {
        this.$store.dispatch("list/resetConfigFilter", {});
      },
    },
    computed: {
      ...mapState({
        isFetching: ({list}) => list.isFetching,
        header: ({list}) => list.header,
        data: ({list}) => list.data,
        config: ({list}) => list.config,
        cart: ({cart}) => cart.list,
      }),
      ...mapGetters({
        filtered: "list/filtered",
        sorted: "list/sorted",
      }),
    },
    mounted: function () {
      if (!this.data.length) {
        this.requestList();
      }
    },
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    min-height: calc(100vh - 50px);
  }
</style>
