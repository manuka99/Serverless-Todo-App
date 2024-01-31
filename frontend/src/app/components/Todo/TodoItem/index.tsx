"use client";
import React from "react";

const TodoItem = () => {
  return (
    <div className="flex w-full h-[60px] items-center justify-between bg-gray-800 p-4 rounded-md">
      <p>My first todo</p>
      <button
        className="bg-red-800 text-sm font-bold py-1 px-2 rounded-md"
        onClick={() => {}}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
