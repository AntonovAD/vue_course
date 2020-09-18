<template>
  <nav>
    <div class="header-title">
      <b>Магазин</b>
    </div>
    <div class="header-cart">
      <HoverColorWrapper
        :color="'#444'"
        :class="'flex-wrap'"
        :style="{marginRight: '5px'}"
      >
        <template slot-scope="props">
          <div
            :style="{color: props.color, marginRight: '5px'}"
          ><b>Корзина</b></div>
          <CircleIcon
            :symbol="0"
            :style="{background: props.color, color: 'moccasin'}"
          />
        </template>
      </HoverColorWrapper>
    </div>
  </nav>
</template>

<script>
  import HoverColorWrapper from "./HoverColorWrapper";
  import CircleIcon from "./CircleIcon";
  export default {
    name: "Header",
    components: {CircleIcon, HoverColorWrapper}
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
