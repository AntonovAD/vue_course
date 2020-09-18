<template>
  <table class="table-list">
    <tbody>
    <tr class="table-list-header">
      <td
        v-for="(item, index) in header"
        :key="index"
        v-on:click="() => headerAction(item)"
        v-bind:class="{
          'sort-asc': config.sort[item.name].count === 1,
          'sort-desc': config.sort[item.name].count === 2
        }"
      >
        <span>
          {{item.name}}
          {{config.sort[item.name].priority !== 0
            ? config.sort[item.name].priority
            : null
          }}
        </span>
      </td>
    </tr>
    <tr
      v-for="(item, index) in list"
      :key="index"
    >
      <td>
        {{item.name}}
      </td>
      <td>
        {{item.price}}
      </td>
      <td
        v-on:click="() => buyAction(item)"
      >
        В корзину
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "TableList",
    props: {
      header: {
        default: () => ([]),
        type: Array
      },
      headerAction: {
        default: () => {},
        type: Function
      },
      config: {
        default: () => ({}),
        type: Object
      },
      list: {
        default: () => ([]),
        type: Array
      },
      itemAction: {
        default: () => {},
        type: Function
      },
      buyAction: {
        default: () => {},
        type: Function
      },
    }
  }
</script>

<style scoped>
  .table-list {

  }
  .table-list-header td {
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
</style>
