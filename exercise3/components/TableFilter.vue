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
      <fragment v-if="value.type === 'default'">
        <tr class="table-filter-value">
          <td>
            <label>
              <input
                :placeholder="value.data.placeholder"
                :type="value.data.type"
                :value="value.data.value"
                v-on:input="(event) => filterAction(key, 'data', event.target.value)"
              />
            </label>
          </td>
        </tr>
      </fragment>
      <fragment v-else-if="value.type === 'range'">
        <tr class="table-filter-value">
          <td>
            <label>
              <input
                :placeholder="value.from.placeholder"
                :type="value.from.type"
                :value="value.from.value"
                v-on:input="(event) => filterAction(key, 'from', event.target.value)"
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
                :value="value.to.value"
                v-on:change="(event) => filterAction(key, 'to', event.target.value)"
              />
            </label>
          </td>
        </tr>
      </fragment>
      <fragment v-else-if="value.type === 'list'">
        <tr class="table-filter-value">
          <td>
            <label>
              <select
                v-on:change="(event) => filterAction(key, 'data', event.target.value)"
                :value="value.data.value"
                :style="value.data.value ? {} : {color: '#777'}"
              >
                <option value="">{{value.data.placeholder}}</option>
                <option
                  v-for="(option, optionIndex) in calcListFilter(value.ref)"
                  :key="optionIndex"
                  :value="option"
                >
                  {{option}}
                </option>
              </select>
            </label>
          </td>
        </tr>
      </fragment>
    </fragment>
    <tr class="table-filter-value table-filter-reset">
      <td
        v-on:click="filterResetAction"
      >
        Сбросить
      </td>
    </tr>
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
      data: {
        default: () => ([]),
        type: Array
      },
      filter: {
        default: () => ({}),
        type: Object
      },
      filterAction: {
        default: () => {},
        type: Function
      },
      filterResetAction: {
        default: () => {},
        type: Function
      },
    },
    methods: {
      calcListFilter(ref) {
        return Array.from(new Set(this.data.map(item => item[ref])));
      },
    },
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
  .table-filter-value td input,
  .table-filter-value td select,
  .table-filter-reset {
    border: none;
    outline: none;
    padding: 0;
    height: 38px;
    width: 100%;
    text-align: center;
  }
  .table-filter-value td select {
    text-align-last: center;
  }
  .table-filter-value td input:hover {
    background: whitesmoke;
  }
  .table-filter-reset {
    cursor: pointer;
    color: red;
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
