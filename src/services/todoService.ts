import apiClient from "./apiClient";

export interface Todo {
  id: string;
  title: string;
  text: string;
  done: boolean;
  date: string;
  listId: number;
}

class TodoService {
  getAllTodos(listId: number) {
    const controller = new AbortController();
    const request = apiClient.get<Todo[]>(`/todolist/${listId}/todos/`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  addTodo(listId: number, todo: Todo) {
    return apiClient.post(`/todolist/${listId}/todos/`, todo);
  }

  deleteTodo(listId: number, id: string) {
    return apiClient.delete(`/todolist/${listId}/todos/` + id);
  }

  editTodo(listId: number, todo: Todo) {
    return apiClient.put(`/todolist/${listId}/todos/` + todo.id, todo);
  }
}

export default new TodoService();
