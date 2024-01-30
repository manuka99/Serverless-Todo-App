import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { saveTodoByUser } from "@dao/todo.dao";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log(event);
    const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
    const body = JSON.parse(event.body!);
    const description = body?.description;
    const todos = await saveTodoByUser(cognitoIdentityId, description);
    return formatJSONResponse({ body: todos });
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
