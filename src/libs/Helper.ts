import { APIGatewayProxyEvent } from "aws-lambda";

export const getCognitoIdentityId = (event: APIGatewayProxyEvent) => {
  const claims = event.requestContext?.authorizer?.claims;
  const cognitoIdentityId = claims?.["cognito:username"] || claims?.sub;
  return cognitoIdentityId;
};
