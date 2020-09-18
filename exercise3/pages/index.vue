<template>
  <div id="index" class="container">
    <div class="page-title">
      <h1>Список Товаров:</h1>
    </div>
    <TableLayout
      :isFetching="isFetching"
      :header="header"
      :data="sorted"
      :config="config"
      :setConfigFilter="setConfigFilter"
      :resetConfigSort="resetConfigSort"
      :setConfigSort="setConfigSort"
      :addToCart="addToCart"
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
        this.$store.dispatch("requestList", {});
      },
      setConfigFilter(name, data, value) {
        this.$store.dispatch("setListConfigFilter", {name, data, value});
      },
      resetConfigSort() {
        this.$store.dispatch("resetListConfigSort", {});
      },
      setConfigSort(name) {
        this.$store.dispatch("setListConfigSort", {name});
      },
      addToCart(item) {
        this.$store.dispatch("addToCart", {item});
      }
    },
    computed: {
      ...mapState({
        isFetching: ({list}) => list.isFetching,
        header: ({list}) => list.header,
        data: ({list}) => list.data,
        config: ({list}) => list.config,
      }),
      ...mapGetters([
        "filtered",
        "sorted",
      ]),
    },
    mounted: function () {
      this.requestList();
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
