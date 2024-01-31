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
