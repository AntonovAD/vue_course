<template>
  <nav>
    <div
      class="header-title"
      v-on:click="logoClick"
    >
      <b>Магазин</b>
    </div>
    <div class="header-cart">
      <HoverColorWrapper
        :color="'#444'"
        :class="'flex-wrap'"
        :style="{marginRight: '5px'}"
        :action="cartClick"
      >
        <template slot-scope="props">
          <div
            :style="{color: props.color, marginRight: '5px'}"
          ><b>Корзина</b></div>
          <CircleIcon
            :symbol="cartItems"
            :style="{background: props.color, color: 'moccasin'}"
          />
        </template>
      </HoverColorWrapper>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from "vuex";
  import HoverColorWrapper from "./HoverColorWrapper";
  import CircleIcon from "./CircleIcon";

  export default {
    name: "Header",
    components: {CircleIcon, HoverColorWrapper},
    computed: {
      ...mapGetters({
        cartItems: "cart/cartItems",
      }),
    },
    methods: {
      logoClick() {
        this.$router.push({path: "/"});
      },
      cartClick() {
        this.$router.push({path: "/cart"});
      }
    },
  }
</script>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: moccasin;
    padding: 10px 20px;
  }
  .header-title {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #444;
    cursor: pointer;
  }
  .header-cart {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: #444;
  }
</style>
