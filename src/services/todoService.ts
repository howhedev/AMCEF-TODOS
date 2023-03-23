import apiClient from "./apiClient";

export interface Todo {
  id: string;
  title: string;
  text: string;
  done: boolean;
  date: string;
}

class TodoService {
  getAllTodos() {
    const controller = new AbortController();
    const request = apiClient.get<Todo[]>("/todolist/1/todos", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  addTodo(todo: Todo) {
    return apiClient.post("/todolist/1/todos/", todo);
  }

  deleteTodo(id: string) {
    return apiClient.delete("/todolist/1/todos/" + id);
  }

  editTodo(todo: Todo) {
    return apiClient.put("/todolist/1/todos/" + todo.id, todo);
  }
}

export default new TodoService();
