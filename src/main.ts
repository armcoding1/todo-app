enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
};

type PriorityType = keyof typeof Priority;

enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive"
};

type StatusType = keyof typeof Status;

type Todo = {
  todo: string;
  priority: PriorityType;
};

type User = {
  name: string;
  status: StatusType;
  todos: Todo[];
  addTodo: (todo: string, priority?: PriorityType) => void;
  changeStatus: (newStatus: StatusType) => void;
  displayTodos: () => void;
};

const user: User = {
  name: "",
  status: "INACTIVE",
  todos: [],
  changeStatus(newStatus) {
    this.status = newStatus;
    console.log(`${this.name} status changed to ${this.status}`);
  },
  addTodo(todo, priority = "MEDIUM") {
    this.todos.push({ todo, priority });
  },

  displayTodos() {
    console.log(`Todos for ${this.name}`);
    this.todos.forEach((todo) => console.log(`Todo name: ${todo.todo} Todo priority: ${todo.priority}`));
  }
}

const todoForm = document.getElementById("todo-form");

todoForm?.addEventListener("submit", (e) => {
  e.preventDefault();
});

const todoList = document.getElementById("todo-list");
const todoName = document.getElementById("todo-name") as HTMLInputElement;
const selectElement = document.getElementById("todo-priority") as HTMLSelectElement;
const addTodoBtn = document.getElementById("add-todo");

addTodoBtn?.addEventListener("click", () => {
  const selectedValue = selectElement.value as PriorityType;
  user.addTodo(todoName?.value, selectedValue);
  const listItem = document.createElement("li");
  listItem.id = "list-item";
  user.todos.forEach((todo) => {
    listItem.textContent = `${todo.todo} ( ${todo.priority} )`;
    todoList?.append(listItem);
  });
});

user.name = "Armen";