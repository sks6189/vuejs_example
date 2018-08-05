<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" v-on:click="toggleAll" v-model="completed">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-for="(todo, index) in filteredTodoList" :key="index">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <li v-bind:class="{completed : todo.checked}">
        <div class="view">
          <input class="toggle" type="checkbox" :checked="todo.checked ? true : false" v-on:click="toggleCheck(todo)">
          <label>{{ todo.title }}</label>
          <button class="destroy" v-on:click="destroyTodo(index)"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
    </ul>
  </section>
</template>

<script>
import { isItemRemained } from '../utils/storage';
import eventBus from '../utils/eventBus';

export default {
  name: 'TodoList',
  props: {
    filteredTodoList: Array,
  },
  data() {
    return {
      completed: isItemRemained()
    }
  },
  methods: {
    toggleCheck(todo) {      
      eventBus.$emit('toggleCheck', todo)
    },
    destroyTodo(index) {
      eventBus.$emit('destroyTodo', index)
    },
    toggleAll() {
      /*
      컴포넌트 관계가 TodoApp - TodoContainer - TodoList로 되면서 컴포넌트 트리가 2단계로 깊어졌네요.
      이럴 때는 오히려 이벤트 버스로 하시는게 편하실 것 같아요. 마음 같아선 바로 뷰엑스를 적용해드리고 싶으나...
      수업 시간에 제가 차근 차근 알려드리고 같이 적용해보면 좋을 것 같습니다 :)

      일단 이벤트 버스 예시는 아래에 남겨놓겠습니다.
      */
      eventBus.$emit('toggleAll', this.completed);
    }
  }
}
</script>

<style>

</style>
