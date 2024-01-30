import { APIGatewayProxyEvent } from "aws-lambda";
import { deleteTodoByUser } from "@dao/todo.dao";
import {
  useHooks,
  logEvent,
  parseEvent,
  handleUnexpectedError,
} from "lambda-hooks";
import { getCognitoIdentityId } from "@libs/Helper";
import { APIGatewayResponse } from "@libs/APIResponses";

const withHooks = useHooks({
  before: [logEvent, parseEvent],
  after: [],
  onError: [handleUnexpectedError],
});

const handler = async (event: APIGatewayProxyEvent) => {
  const cognitoIdentityId = getCognitoIdentityId(event);
  const body = event?.body;
  const todoId = body?.todo_id;
  if (!todoId) {
    return APIGatewayResponse.R400({
      error: "Invalid Todo!",
    });
  }
  await deleteTodoByUser(cognitoIdentityId, todoId);
  return APIGatewayResponse.R200({
    message: "Item was deleted successfully",
  });
};

exports.handler = withHooks(handler);
