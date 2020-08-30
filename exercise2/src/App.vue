<template>
  <div id="app">
    <router-link
      v-for="(tab, index) in tabs"
      :to="tab.href"
      :key="index"
    >
      <button
        v-bind:class="['tab-button', {'active': currentTab===index}]"
        v-on:click="$store.dispatch('setCurrentTab', {index})"
      >
        {{ tab.name }}
      </button>
    </router-link>
    <keep-alive>
      <router-view v-if="currentTab<tabs.length && currentTab>=0" :key="currentTab"/>
    </keep-alive>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'App',
    components: {
    },
    data: function() {
      return {
        tabs: [
          {
            name:"Первый",
            href:"/table/0",
          },
          {
            name:"Второй",
            href:"/table/1",
          },
        ],
      };
    },
    methods: {
      isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      },
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
    mounted() {
      if (this.isNumeric(this.$route.params.id)) {
        this.$store.dispatch('setCurrentTab', {index: parseFloat(this.$route.params.id)});
      } else {
        this.$store.dispatch('setCurrentTab', {index: 0});
        this.$router.replace("/table/0");
      }
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
