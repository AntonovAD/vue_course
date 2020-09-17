<template>
  <nav>
    <div class="header-title">
      Магазин
    </div>
    <div class="header-cart">
      <IconButton
        :color="'#fff'"
        :hoverColor="'#fff'"
        :class="'flex-wrap'"
        :style="{marginRight: '5px'}"
      >
        <template slot-scope="props">
          <div
            :style="{color: props.color, marginRight: '5px'}"
          >Корзина</div>
          <CartIcon
            :color="props.color" :size="25"
            :style="{marginRight: '5px'}"
          />
          <CircleIcon
            :symbol="0"
            :style="{background: props.color, color: '#3b8070'}"
          />
        </template>
      </IconButton>
    </div>
  </nav>
</template>

<script>
  import IconButton from "./IconButton";
  import CartIcon from "./Icons/CartIcon";
  import CircleIcon from "./CircleIcon";
  export default {
    name: "Header",
    components: {CircleIcon, CartIcon, IconButton}
  }
</script>

<style scoped>
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #3b8070;
    padding: 10px 20px;
  }
  .header-title {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
  }
  .header-cart {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
  }
</style>
