<template>
  <div class="container">
    <TableLayout/>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import TableLayout from "../components/TableLayout";

  export default {
    components: {
      TableLayout
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

<style scoped>
  .container {
    margin: 0 auto;
    padding: 20px;
    min-height: calc(100vh - 50px);
    display: flex;
  }
</style>
