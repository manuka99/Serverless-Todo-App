import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { saveTodoByUser } from "@dao/todo.dao";
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
  const description = body?.description;
  if (!description) {
    return formatJSONResponse({
      statusCode: 400,
      body: { error: "Description is required!" },
    });
  }
  const todos = await saveTodoByUser(cognitoIdentityId, description);
  return formatJSONResponse({ body: todos });
};

exports.handler = withHooks(handler);
