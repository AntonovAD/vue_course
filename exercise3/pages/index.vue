<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        exercise3
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
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
        //this.$store.dispatch('setCurrentTab', {index: parseFloat(this.$route.params.id)});
      } else {
        //this.$store.dispatch('setCurrentTab', {index: 0});
        //this.$router.replace("/table/0");
      }
    },
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
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
