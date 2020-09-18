<template>
  <div class="color-button">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: "ColorButton",
    props: {
      title: String
    }
  }
</script>

<style scoped>
  .color-button {
    padding: 5px 10px;
    background: transparent;
    border-radius: 2px;
    color: white;
    font-weight: unset;
    display: flex;
    align-self: center;
    cursor: pointer;
    border: none;
    outline: none;
  }
</style>
