<template>
  <table class="table-list">
    <tbody>
    <tr class="table-list-header">
      <td
        v-for="(item, index) in header"
        :key="`item-${index}`"
        v-on:click="() => headerAction(item)"
        v-bind:class="config.sort[item.name] ? {
          'sort-asc': config.sort[item.name].count === 1,
          'sort-desc': config.sort[item.name].count === 2
        } : {}"
      >
        <span>
          {{item.name}}
          {{config.sort[item.name]
            ? config.sort[item.name].priority !== 0
              ? config.sort[item.name].priority
              : null
            : null
          }}
        </span>
      </td>
      <td
        v-for="(item, index) in controlButtons"
        :key="`button-${index}`"
      >
        <span>
          {{item.header}}
        </span>
      </td>
    </tr>
    <tr
      v-for="(item, itemIndex) in list"
      :key="itemIndex"
    >
      <td
        v-for="(value, key, valueIndex) in item"
        v-if="header.map(h=>h.ref).includes(key)"
        :key="`value-${valueIndex}`"
      >
        {{value}}
      </td>
      <td
        v-for="(button, buttonIndex) in controlButtons"
        :key="`button-${buttonIndex}`"
        class="table-list-item-button"
        v-on:click="() => button.action(item)"
        :style="{color: button.color(item)}"
      >
        {{button.title(item)}}
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
      controlButtons: {
        default: () => ([]),
        type: Array
      },
    }
  }
</script>

<style scoped>
  .table-list {
    display: flex;
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
  .table-list-item-button {
    cursor: pointer;
  }
</style>
