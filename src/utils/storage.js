function fetchStorage() {
  let todoList = [];
  if (localStorage.getItem('todoList')) {
    try {
      todoList = JSON.parse(localStorage.getItem('todoList'));
    } catch (e) {
      localStorage.removeItem('todoList');
    }
  }
  return todoList;
}

function setStorage(todoList) {
  let parsed = JSON.stringify(todoList);
  localStorage.setItem('todoList', parsed);
}

function isItemRemained() {
  return fetchStorage().filter(todo => !todo.checked).length === 0;
}

export {
  fetchStorage,
  setStorage,
  isItemRemained,
}