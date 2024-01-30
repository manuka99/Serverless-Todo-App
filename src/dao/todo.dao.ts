import { Todo } from "src/types/todo";
import documentClient from "../libs/Dynamo";
import { v4 as uuidv4 } from "uuid";

const TodosTableName = process.env.TodosTableName;

export const getTodosByUser = async (userId: string): Promise<Todo[]> => {
  const params = {
    TableName: TodosTableName,
    KeyConditionExpression: "#partitionKey = :partitionKey",
    ExpressionAttributeNames: {
      "#partitionKey": "user_id",
    },
    ExpressionAttributeValues: {
      ":partitionKey": userId,
    },
  };
  const data = await documentClient.query(params).promise();
  return data.Items as Todo[];
};

export const saveTodoByUser = async (
  userId: string,
  description: string
): Promise<Todo> => {
  const todoId = uuidv4();
  const params = {
    TableName: TodosTableName,
    Item: {
      user_id: userId,
      todo_id: todoId,
      description,
      timestamp: Date.now(),
    },
  };
  await documentClient.put(params).promise();
  return params.Item as Todo;
};

export const  deleteTodoByUser = async (
  userId: string,
  todoId: string
): Promise<void> => {
  const params = {
    TableName: TodosTableName,
    Key: {
      user_id: userId,
      todo_id: todoId,
    },
  };
  await documentClient.delete(params).promise();
};
