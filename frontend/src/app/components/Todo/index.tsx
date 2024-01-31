"use client";
import React from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const addTodo = async () => {};
  return (
    <div className="flex w-full p-2 flex-col">
      {/* add todo */}
      <div className="flex gap-2 w-[75%]">
        <input
          type="text"
          id="rounded-email"
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Todo Description"
        />
        <button
          className="bg-blue-600 text-sm font-bold py-2 px-4 rounded-md"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      {/* end add todo */}
      {/* start display todo */}
      <div className="flex flex-col gap-1 overflow-y-auto my-4">
        <TodoItem />
      </div>
      {/* end display todo */}
    </div>
  );
};

export default Todo;
