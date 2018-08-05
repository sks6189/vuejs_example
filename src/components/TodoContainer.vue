<template>
  <div>
    <TodoList
      v-bind:filteredTodoList="filteredTodoList"
    />
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count">
        <strong>{{ leftItems }}</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a v-bind:class="{selected : filterStatus === Filter.ALL}" href="#/" v-on:click="adjustFilter(Filter.ALL)">All</a>
        </li>
        <li>
          <a v-bind:class="{selected : filterStatus === Filter.ACTIVE}" href="#/active" v-on:click="adjustFilter(Filter.ACTIVE)">Active</a>
        </li>
        <li>
          <a v-bind:class="{selected : filterStatus === Filter.COMPLETED}" href="#/completed" v-on:click="adjustFilter(Filter.COMPLETED)">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" v-on:click="clearCompleted">Clear completed</button>
    </footer>
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import { Filter } from '../constants/filter'

export default {
  name: 'TodoContainer',
  data() {
    return {
      Filter
    }
  },
  components: {
    TodoList
  },
  props: {
    filteredTodoList: Array,
    filterStatus: String,
    leftItems: Number
  },
  methods: {
    clearCompleted() {
      this.$emit('clearCompleted')
    },
    adjustFilter(filter) {
      this.$emit('adjustFilter', filter)
    }
  }
}
</script>

<style scoped>

</style>
