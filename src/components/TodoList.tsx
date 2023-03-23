import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoFilterByEnum } from "../App";
import useTodos from "../hooks/useTodos";
import todoService, { Todo } from "../services/todoService";
import FormModal from "./FormModal";
import TodoItem from "./TodoItem";

interface Props {
  selectedFilter: TodoFilterByEnum;
  searchQuery: string;
}
const TodoList = ({ selectedFilter, searchQuery }: Props) => {
  const { todos, error, isLoading, setTodos, setError } = useTodos();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>();

  const onAddTodo = (todo: Todo) => {
    const originalTodos = [...todos];

    setTodos([todo, ...todos]);

    todoService
      .addTodo(todo)
      .then(({ data: savedTodo }) => setTodos([savedTodo, ...todos]))
      .catch((err) => {
        setError(err.message);
        setTodos(originalTodos);
      });
  };

  const onEditTodo = (todo: Todo) => {
    const originalTodos = [...todos];
    const updatedTodo = { ...todo, done: !todo.done };

    setTodos(todos.map((td) => (td.id === todo.id ? updatedTodo : td)));

    todoService.editTodo(updatedTodo).catch((err) => {
      setError(err.message);
      setTodos(originalTodos);
    });
  };

  const onDeleteTodo = (todo: Todo) => {
    const originalTodos = [...todos];
    setTodos(todos.filter((td) => td.id !== todo.id));

    todoService.deleteTodo(todo.id).catch((err) => {
      setError(err.message);
      setTodos(originalTodos);
    });
  };

  useEffect(() => {
    setFilteredTodos(() => {
      let output: Todo[] = todos;
      if (selectedFilter === "Done")
        output = todos.filter((todo) => todo.done === true);

      if (selectedFilter === "Pending")
        output = todos.filter((todo) => todo.done !== true);

      return output.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [todos, selectedFilter, searchQuery]);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-6xl self-center font-semibold color text-white">
          TODOS
        </h1>
        <div className="mt-5">
          <FormModal handleAdd={(todo) => onAddTodo(todo)} />
        </div>

        {error && <p>{error}</p>}
        {isLoading && <h2>Loading ...</h2>}

        <ul>
          {filteredTodos?.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                handleDelete={onDeleteTodo}
                handleEdit={onEditTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
