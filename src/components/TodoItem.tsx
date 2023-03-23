import { parse } from "@vue/compiler-dom";
import React, { useEffect, useState } from "react";
import { Todo } from "./../services/todoService";

interface Props {
  todo: Todo;
  handleEdit: (data: Todo) => void;
  handleDelete: (data: Todo) => void;
}

const TodoItem = ({ todo, handleEdit, handleDelete }: Props) => {
  const [parsedDate, setParsedDate] = useState("default");

  useEffect(() => {
    const parsedDate = todo.date
      .substring(todo.date.indexOf(" ") + 1)
      .split(" ");
    parsedDate[0] = parsedDate.splice(1, 1, parsedDate[0])[0];
    setParsedDate(parsedDate.join(" "));
  }, [todo]);

  return (
    <div>
      <div className="w-full relative my-2">
        <div
          className={`w-full flex justify-between  rounded-xl shadow-md
         px-6 py-6 ${todo.done ? "bg-green-300" : "bg-gray-50"}`}
        >
          <div className="flex flex-col max-w-xl">
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p>{todo.text}</p>
            <div className="flex flex-col mt-10 ">
              <label className="text-slate-600 text-xs">Deadline</label>
              <p
                className={`font-bold text-blue-500  ${
                  todo.done ? "line-through " : ""
                }`}
              >
                {parsedDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleEdit(todo)}
              className="bg-blue-500 text-white rounded-xl  hover:bg-green-500 focus:outline-none py-2 px-4 flex items-center justify-center"
            >
              {todo.done ? "Need Fixing" : "Mark as done"}
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
