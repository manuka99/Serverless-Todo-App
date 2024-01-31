import * as axios from "axios";
import { Todo } from "../model/Todo.m";
export const getTodosForUser = async (authToken: string): Promise<Todo[]> => {
  const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  const res = await axios.default.get(`${API_GATEWAY_URL}/todos`, {
    headers: {
      Authorization: authToken,
    },
  });
  const data = res.data;
  const todos = data?.data as Todo[];
  return todos;
};

export const saveTodoByUser = async (
  authToken: string,
  description: string
): Promise<void> => {
  const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  await axios.default.post(
    `${API_GATEWAY_URL}/todos`,
    {
      description,
    },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};

export const deleteTodoByUser = async (
  authToken: string,
  todoId: string
): Promise<void> => {
  const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
  await axios.default.delete(`${API_GATEWAY_URL}/todos`, {
    headers: {
      Authorization: authToken,
    },
    data: {
      todo_id: todoId,
    },
  });
};
