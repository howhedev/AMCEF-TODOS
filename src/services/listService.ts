import apiClient from "./apiClient";

export interface List {
  id: number;
  title: string;
}

class ListService {
  getAllLists() {
    const controller = new AbortController();
    const request = apiClient.get<List[]>(`/todolist/`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  addList(list: List) {
    return apiClient.post(`/todolist/`, list);
  }

  deleteList(id: number) {
    return apiClient.delete(`/todolist/` + id);
  }

  editList(list: List) {
    return apiClient.put(`/todolist/` + list.id, list);
  }
}

export default new ListService();
