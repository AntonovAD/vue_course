<template>
  <div id="cart" class="container">
    <div class="page-title">
      <h1>Ваша Корзина:</h1>
    </div>
    <div class="cart-layout">
      <TableList
        :list="cart.list"
        :header="header"
        :config="config"
        :controlButtons="[
          {
            title(item) {
              const config = cart.config[item.id];
              return config ? config.count : undefined;
            },
            action(item) {

            },
            color(item) {

            },
            header: 'Заказано'
          },
          {
            title(item) {
              return 'Удалить';
            },
            action(item) {

            },
            color(item) {
              return 'red';
            }
          }
        ]"
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
        cart: (state) => state.cart,
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
