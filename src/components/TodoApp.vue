<template>
    <div id="todoapp">
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="찾으실 단어를 입력하세요" v-on:keydown="searchTodo"/>
                <input
                        class="new-todo"
                        placeholder="할일을 등록하세요"
                        autofocus
                        v-model="todoInput"
                        v-on:keyup.enter="addTodo"
                >

            </header>
            <!-- This section should be hidden by default and shown when there are todos -->
            <TodoContainer
                    v-bind:filteredTodoList="filteredTodoList"
                    v-bind:filterStatus="filterStatus"
                    v-bind:leftItems="leftItems"
                    v-on:clearCompleted="clearCompleted"
                    v-on:adjustFilter="adjustFilter"
            />
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <!-- Remove the below line ↓ -->
            <p>Template by
                <a href="http://sindresorhus.com">Sindre Sorhus</a>
            </p>
            <!-- Change this out with your name and url ↓ -->
            <p>Created by
                <a href="http://todomvc.com">you</a>
            </p>
            <p>Part of
                <a href="http://todomvc.com">TodoMVC</a>
            </p>
        </footer>
    </div>
</template>

<script>
    import eventBus from '../utils/eventBus';
    import TodoContainer from './TodoContainer.vue';
    import {Filter} from "../constants/filter";
    import {fetchStorage, setStorage} from '../utils/storage.js';

    export default {
        name: 'TodoApp',
        components: {TodoContainer},
        data() {
            return {
                todoInput: '',
                todoList: [],
                filterStatus: Filter.ALL,
            }
        },
        created() {
            eventBus.$on('toggleCheck', todo => this.toggleCheck(todo));
            eventBus.$on('destroyTodo', index => this.destroyTodo(index));
            eventBus.$on('toggleAll', this.toggleAll);
        },
        mounted() {
            this.todoList = fetchStorage();
        },
        methods: {
            addTodo() {
                if (this.todoInput == '') {
                    return
                }
                this.todoList.push({
                    title: this.todoInput,
                    checked: false
                });
                this.todoInput = ''
                setStorage(this.todoList);
            },
            toggleCheck(todo) {
                todo.checked = !todo.checked
                setStorage(this.todoList);
            },
            destroyTodo(index) {
                /*
                배열의 내장 API를 이용해서 요소를 삭제하려는 시도는 아주 좋습니다 :)
                다만, pop()은 배열의 마지막 요소를 삭제하기 떄문에 여기서 원하는 요소를 삭제할 수 없게 됩니다.
                배열 삭제에서는 splice(), slice()를 활용해보세요 :)
                */
                this.todoList.splice(index, 1);
                setStorage(this.todoList);
            },
            toggleAll(completed) {
                completed === false
                    ? this.todoList.forEach(todo => todo.checked = true)
                    : this.todoList.forEach(todo => todo.checked = false)

                setStorage(this.todoList);
            },
            clearCompleted() {
                this.todoList = this.todoList.filter(todo => !todo.checked);
                setStorage(this.todoList);
            },
            adjustFilter(filter) {
                this.filterStatus = filter
            },
            searchTodo() {
                console.log(this.todoList);
            },
        },
        computed: {
            leftItems() {
                return this.todoList.filter(todo => !todo.checked).length
            },
            filteredTodoList() {
                switch (this.filterStatus) {
                    case Filter.ALL:
                        return this.todoList;
                    case Filter.ACTIVE:
                        return this.todoList.filter(todo => !todo.checked);
                    case Filter.COMPLETED:
                        return this.todoList.filter(todo => todo.checked);
                    default:
                        return this.todoList
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
