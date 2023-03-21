import apiClient from "./apiClient";

export interface Todo {
  id: string;
  title: string;
  text: string;
  done: boolean;
  date: number;
}

class TodoService {
  getAllTodos() {
    const controller = new AbortController();
    const request = apiClient.get<Todo[]>("/todo", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  addTodo(todo: Todo) {
    return apiClient.post("/todo/", todo);
  }

  deleteTodo(id: string) {
    return apiClient.delete("/todo/" + id);
  }

  editTodo(todo: Todo) {
    return apiClient.put("/todo/" + todo.id, todo);
  }
}

export default new TodoService();
