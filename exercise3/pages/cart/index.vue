<template>
  <div id="cart" class="container">
    <div class="page-title">
      <h1>Ваша Корзина:</h1>
    </div>
    <div class="cart-layout">
      <TableList
        :list="cart"
        :header="header"
        :config="config"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import TableList from "../../components/TableList";

  export default {
    components: {TableList},
    computed: {
      ...mapState({
        header: ({list}) => list.header,
        cart: ({cart}) => cart.list,
        config: ({list}) => list.config,
      }),
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
  .cart-layout {
    display: flex;
    flex-direction: row;
  }
</style>
