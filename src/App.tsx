import { v4 as uuidv4 } from "uuid";
import "./App.css";
import useTodos from "./hooks/useTodos";

import todoService, { Todo } from "./services/todoService";

function App() {
  const { todos, error, isLoading, setTodos, setError } = useTodos();

  const addTodo = () => {
    const originalTodos = [...todos];
    const newDummyTodo = {
      title: "New Todo",
      done: false,
      text: "I am a new todo",
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

  const editTodo = (todo: Todo) => {
    const originalTodos = [...todos];
    const updatedTodo = { ...todo, done: !todo.done };

    setTodos(todos.map((td) => (td.id === todo.id ? updatedTodo : td)));

    todoService.editTodo(updatedTodo).catch((err) => {
      setError(err.message);
      setTodos(originalTodos);
    });
  };

  const deleteTodo = (todo: Todo) => {
    const originalTodos = [...todos];
    setTodos(todos.filter((td) => td.id !== todo.id));

    todoService.deleteTodo(todo.id).catch((err) => {
      setError(err.message);
      setTodos(originalTodos);
    });
  };

  return (
    <>
      <button onClick={addTodo}>Add new todo</button>
      {error && <p>{error}</p>}
      {isLoading && <h2>Loading ...</h2>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex" }}>
            {todo.done ? (
              <p style={{ backgroundColor: "green" }}>{todo.title}</p>
            ) : (
              <p>{todo.title}</p>
            )}
            <button onClick={() => editTodo(todo)}>Done</button>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
function uuid() {
  throw new Error("Function not implemented.");
}
