import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { deleteTodoByUser } from "@dao/todo.dao";
import {
  useHooks,
  logEvent,
  parseEvent,
  handleUnexpectedError,
} from "lambda-hooks";
import { getCognitoIdentityId } from "@libs/Helper";

const withHooks = useHooks({
  before: [logEvent, parseEvent],
  after: [],
  onError: [handleUnexpectedError],
});

const handler = async (event: APIGatewayProxyEvent) => {
  const cognitoIdentityId = getCognitoIdentityId(event);
  const body = event?.body;
  const todoId = body?.todo_id;
  await deleteTodoByUser(cognitoIdentityId, todoId);
  return formatJSONResponse({
    body: {
      message: "Item was deleted successfully",
    },
  });
};

exports.handler = withHooks(handler);
