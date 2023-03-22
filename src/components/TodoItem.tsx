import React from "react";
import { Todo } from "./../services/todoService";

interface Props {
  todo: Todo;
  handleEdit: (data: Todo) => void;
  handleDelete: (data: Todo) => void;
}

const TodoItem = ({ todo, handleEdit, handleDelete }: Props) => {
  return (
    <div>
      <div className="w-full relative my-2">
        <div
          className={`w-full flex justify-between  rounded-xl shadow-md
         px-6 py-6 ${todo.done ? "bg-green-300" : "bg-gray-50"}`}
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{todo.title}</h2>
            <p className="">{todo.text}</p>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleEdit(todo)}
              className="bg-blue-500 text-white rounded-xl  hover:bg-green-500 focus:outline-none py-2 px-4 flex items-center justify-center"
            >
              {todo.done ? "Done" : "Did it!"}
            </button>

            <button
              onClick={() => handleDelete(todo)}
              className="  bg-red-500 text-white rounded-xl  hover:bg-red-400 focus:outline-none py-2 px-4 flex items-center justify-center"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
