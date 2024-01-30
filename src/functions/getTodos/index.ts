import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { getTodosByUser } from "@dao/todo.dao";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log(event);
    const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;
    const todos = await getTodosByUser(cognitoIdentityId);
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
