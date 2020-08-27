<template>
  <fragment>
  <table class="table-list">
    <tbody>
    <tr class="table-list-header">
      <td
        v-for="(item, index) in header"
        :key="index"
        v-on:click="headerOnClick(item.name)"
        v-bind:class="{'sort-asc': config.sort[item.name].count === 1, 'sort-desc': config.sort[item.name].count === 2}"
      >
        <span>
          {{ item.name }}
          {{ config.sort[item.name].priority !== 0 ? config.sort[item.name].priority : null }}
        </span>
      </td>
    </tr>
    <tr
      v-for="(item, index) in list"
      :key="index"
    >
      <td>
        {{ item.name }}
      </td>
      <td>
        {{ item.price }}
      </td>
    </tr>
    </tbody>
  </table>
  <table class="table-filter">
    <tbody>
    <tr class="table-filter-header">
      <td>
        Фильтр
      </td>
    </tr>
    <tr class="table-filter-value">
      <td>
        <input
          placeholder="Цена от"
          type="number"
          v-model.number="config.filter['Цена'].from"
          v-on:change="filterChange"
        />
      </td>
    </tr>
    <tr class="table-filter-value">
      <td>
        <input
          placeholder="Цена до"
          type="number"
          v-model.number="config.filter['Цена'].to"
          v-on:change="filterChange"
        />
      </td>
    </tr>
    </tbody>
  </table>
  </fragment>
</template>

<script>
  import Fragment from 'vue-fragment';
  import Vue from "vue";
  Vue.use(Fragment.Plugin);

  export default {
    name: "Table",
    props: {
      list: Array,
      header: Array,
      headerOnClick: Function,
      filter: Array,
      filterChange: Function,
      config: Object,
    }
  }
</script>

<style scoped>
  .table-list {

  }
  .table-list-header {
    cursor: pointer;
    background: lavender;
  }
  .table-list-header td:hover {
    background: moccasin;
  }
  .table-list-header td span::after {
    content: '';
  }
  .table-list-header td.sort-asc span::after {
    content: '▲';
  }
  .table-list-header td.sort-desc span::after {
    content: '▼';
  }
  .table-filter {

  }
  .table-filter-header td {
    background: lavender;
  }
  .table-filter-header td:hover {
    background: lavender;
  }
  .table-filter-value td {
    padding: 0;
  }
  .table-filter-value td input {
    border: none;
    outline: none;
    padding: 0;
    height: 38px;
    text-align: center;
  }
  .table-filter-value td input:hover {
    background: whitesmoke;
  }
  tr, td {
    border-color: transparent;
  }
  td {
    border: 1px solid white;
    padding: 10px 50px;
    min-width: 58px;
  }
  td:hover {
    background: whitesmoke;
  }
  input {
    font-family: inherit;
  }
</style>