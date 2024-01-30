import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/APIResponses";
import { getTodosByUser } from "@dao/todo.dao";

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
  const cognitoIdentityId = getCognitoIdentityId(event)
  const todos = await getTodosByUser(cognitoIdentityId);
  return formatJSONResponse({ body: todos });
};

exports.handler = withHooks(handler);
