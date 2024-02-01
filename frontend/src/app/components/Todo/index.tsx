"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useSession } from "next-auth/react";
import {
  deleteTodoByUser,
  getTodosForUser,
  saveTodoByUser,
} from "@/app/services/Todo.s";
import { Todo } from "@/app/model/Todo.m";
import { toast } from "react-toastify";

const Todo = () => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<undefined | string | null>();

  useEffect(() => {
    fetchTodo();
  }, [session?.user]);

  const fetchTodo = async (): Promise<void> => {
    try {
      // @ts-ignore
      const idToken: string = session?.account?.id_token;
      if (!idToken) return;
      setLoading(true);
      const _todos = await getTodosForUser(idToken);
      setTodos(_todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    try {
      // @ts-ignore
      const idToken: string = session?.account?.id_token;
      if (!idToken) return;
      if (!description) {
        toast.error("Description is required!");
        return;
      }
      setLoading(true);
      await saveTodoByUser(idToken, description);
      toast.success("Todo was added successfully");
      setDescription(null);
      fetchTodo();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      // @ts-ignore
      const idToken: string = session?.account?.id_token;
      if (!idToken) return;
      if (!todoId) {
        toast.error("Todo Id is required!");
        return;
      }
      setLoading(true);
      await deleteTodoByUser(idToken, todoId);
      toast.success("Todo was deleted successfully");
      fetchTodo();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  if (loading)
    return (
      <div className="p-4">
        <p className="text-lg font-bold text-white">Loading....</p>
      </div>
    );

  return (
    <div className="flex w-full p-2 flex-col overflow-hidden">
      {/* add todo */}
      <div className="flex gap-2">
        <input
          type="text"
          id="rounded-email"
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Todo Description"
          value={description || ""}
          onChange={onChangeDescription}
        />
        <button
          className="bg-blue-600 text-sm font-bold py-2 px-4 rounded-md"
          onClick={addTodo}
        >
          Add New Todo
        </button>
      </div>
      {/* end add todo */}
      {/* start display todo */}
      <div className="flex flex-col gap-1 overflow-y-auto my-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo?.todo_id} data={todo} deleteTodo={deleteTodo} />
          ))
        ) : (
          <div className="flex w-full items-center justify-center p-4">
            <p className="text-lg md:text-xl font-bold text-yellow-200">
              No Todos Found. Start by creating your first Todo!
            </p>
          </div>
        )}
      </div>
      {/* end display todo */}
    </div>
  );
};

export default Todo;
