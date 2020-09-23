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
              delFromCart(item);
            },
            color(item) {
              return 'red';
            }
          }
        ]"
        :style="{marginBottom: '20px'}"
      />
      <div class="cart-total">
        <h2>
          Итого:
          {{totalPrice}}
          руб.
        </h2>
      </div>
      <div class="cart-buy">
        <div
          class="button"
          v-on:click="buyItems"
        >
          Купить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
  import TableList from "../../components/TableList";

  export default {
    components: {TableList},
    computed: {
      ...mapState({
        header: ({list}) => list.header,
        cart: ({cart}) => cart,
        config: ({list}) => list.config,
      }),
      ...mapGetters({
        totalPrice: "cart/cartTotalPrice",
      }),
    },
    methods: {
      delFromCart(item) {
        this.$store.dispatch("cart/delFromCart", {item});
      },
      buyItems() {
        this.$store.dispatch("cart/buyItems", {});
      },
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
    flex-direction: column;
  }
  .cart-total {
    margin-bottom: 20px;
  }
  .cart-buy {
    display: flex;
    margin-bottom: 20px;
    color: #3b8070;
    cursor: pointer;
  }
</style>
