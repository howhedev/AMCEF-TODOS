import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTodos from "../hooks/useTodos";
import todoService, { Todo } from "../services/todoService";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos, error, isLoading, setTodos, setError } = useTodos();
  //   const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const addTodo = () => {
    const originalTodos = [...todos];
    const newDummyTodo = {
      title: "New Todo",
      done: false,
      text: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia adipisci perspiciatis id eaque quo eos?",
      date: 846846,
      id: uuidv4(),
    };

    setTodos([newDummyTodo, ...todos]);

    todoService
      .addTodo(newDummyTodo)
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

  //   const showAll = () => {
  //     const todosToShow = [...todos];
  //     setFilteredTodos([...todosToShow]);
  //   };
  //   const showDone = () => {
  //     const todosToShow = todos.filter((todo) => todo.done);
  //     setFilteredTodos([...todosToShow]);
  //   };
  //   const showPending = () => {
  //     const todosToShow = todos.filter((todo) => !todo.done);
  //     setFilteredTodos([...todosToShow]);
  //   };

  return (
    <>
      <div className="flex flex-col p-5">
        <h1 className="text-6xl self-center font-semibold color text-white">
          TODOS
        </h1>
        <button
          onClick={addTodo}
          className="bg-green-500 text-white rounded-xl p-2 mt-5 hover:bg-indigo-400 focus:outline-none"
        >
          Add new todo
        </button>
        {/* <button onClick={showAll}>Show All</button>
        <button onClick={showDone}>Show Done</button>
        <button onClick={showPending}>Show Pending</button> */}

        {error && <p>{error}</p>}
        {isLoading && <h2>Loading ...</h2>}

        <ul>
          {todos.map((todo) => (
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
