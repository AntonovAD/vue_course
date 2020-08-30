<template>
  <div id="app">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      v-bind:class="['tab-button', {'active': currentTab===index}]"
      v-on:click="$store.dispatch('setCurrentTab', {index})"
    >
      {{ tab.name }}
    </button>
    <keep-alive>
      <component v-bind:is="tabs[currentTab].component" :key="currentTab"/>
    </keep-alive>
  </div>
</template>

<script>
  import TableLayout from "./layouts/TableLayout";
  import {mapState} from "vuex";

  export default {
    name: 'App',
    components: {
      TableLayout,
    },
    data: function() {
      return {
        tabs: [
          {
            name:"Первый",
            component: TableLayout,
          },
          {
            name:"Второй",
            component: TableLayout,
          },
        ],
      };
    },
    computed: {
      ...mapState([
        //проброс через массив строк
        'currentTab',
      ]),
      ...mapState({
        //проброс через функцию //currentTab: state => state.currentTab,
        //проброс через строку //currentTab: "currentTab",
      }),
    },
  }
</script>

<style>
  body {
    font-family: "Courier New", serif;
    margin: 20px
  }
  #app {

  }
  .tab-button {
    font-family: "Courier New", serif;
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    outline: none;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: lavender;
  }
</style>
