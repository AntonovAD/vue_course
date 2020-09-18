<template>
  <div
      class="hover-color-button"
      :style="{cursor: interactive ? 'pointer' : 'default'}"
      v-on:mouseover="hover=true"
      v-on:mouseout="hover=false"
      v-on:click="($event) => {
        $event.stopPropagation();
        action();
      }"
  >
    <slot :color="hover ? hoverColor ? hoverColor : color : color"/>
  </div>
</template>

<script>
  export default {
    name: "HoverColorWrapper",
    props: {
      color: String,
      hoverColor: String,
      interactive: {
        default: true,
        type: Boolean
      },
      action: {
        default: ()=>{},
        type: Function
      },
    },
    data() {
      return {
        hover: false,
      }
    }
  }
</script>

<style scoped>
  .hover-color-button {
    display: flex;
  }
</style>
