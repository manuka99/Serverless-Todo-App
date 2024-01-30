import { APIGatewayProxyEvent } from "aws-lambda";
import { saveTodoByUser } from "@dao/todo.dao";
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
  const description = body?.description;
  if (!description) {
    return APIGatewayResponse.R400({
      error: "Description is required!",
    });
  }
  const todos = await saveTodoByUser(cognitoIdentityId, description);
  return APIGatewayResponse.R200({ data: todos });
};

exports.handler = withHooks(handler);
