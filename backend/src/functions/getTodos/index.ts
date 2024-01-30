import { APIGatewayProxyEvent } from "aws-lambda";
import { getTodosByUser } from "@dao/todo.dao";

import {
  useHooks,
  logEvent,
  parseEvent,
  handleUnexpectedError,
} from "lambda-hooks";
import { getCognitoIdentityId } from "@libs/Helper";
import { APIGatewayResponse, Response } from "@libs/APIResponses";

const withHooks = useHooks({
  before: [logEvent, parseEvent],
  after: [],
  onError: [handleUnexpectedError],
});

const handler = async (event: APIGatewayProxyEvent): Promise<Response> => {
  const cognitoIdentityId = getCognitoIdentityId(event);
  const todos = await getTodosByUser(cognitoIdentityId);
  return APIGatewayResponse.R200({ data: todos });
};

exports.handler = withHooks(handler);
