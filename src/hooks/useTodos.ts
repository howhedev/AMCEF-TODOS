import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = todoService.getAllTodos();

    request
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { todos, error, isLoading, setTodos, setError };
};

export default useTodos;
