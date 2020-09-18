<template>
  <table class="table-filter">
    <tbody>
    <tr class="table-filter-header">
      <td>
        Фильтр
      </td>
    </tr>
    <fragment
      v-for="(value, key) in filter"
      :key="key"
    >
      <fragment v-if="value.type === 'range'">
        <tr class="table-filter-value">
          <td>
            <label>
              <input
                :placeholder="value.from.placeholder"
                :type="value.from.type"
                v-model.number="value.from.value"
                v-on:change="filterAction"
              />
            </label>
          </td>
        </tr>
        <tr class="table-filter-value">
          <td>
            <label>
              <input
                :placeholder="value.to.placeholder"
                :type="value.to.type"
                v-model.lazy.number="value.to.value"
                v-on:change="filterAction"
              />
            </label>
          </td>
        </tr>
      </fragment>
    </fragment>
    </tbody>
  </table>
</template>

<script>
  import Vue from "vue";
  import Fragment from 'vue-fragment';
  Vue.use(Fragment.Plugin);

  export default {
    name: "TableFilter",
    props: {
      filter: {
        default: () => ({}),
        type: Object
      },
      filterAction: {
        default: () => {},
        type: Function
      },
    }
  }
</script>

<style scoped>
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
    width: 100%;
    text-align: center;
  }
  .table-filter-value td input:hover {
    background: whitesmoke;
  }
  tr, td {
    border-color: transparent;
    background: white;
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
