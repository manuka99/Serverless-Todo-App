import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { deleteTodoByUser } from "@dao/todo.dao";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log(event);
    const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
    const body = JSON.parse(event.body!);
    const todoId = body?.todo_id;
    await deleteTodoByUser(cognitoIdentityId, todoId);
    return formatJSONResponse({
      body: {
        message: "Item was deleted successfully",
      },
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({
      statusCode: 500,
      body: {
        message: error.message,
      },
    });
  }
};
