import { AWS } from "@serverless/typescript";

const corsSettings = {
  headers: [
    // Specify allowed headers
    "Content-Type",
    "X-Amz-Date",
    "Authorization",
    "X-Api-Key",
    "X-Amz-Security-Token",
    "X-Amz-User-Agent",
  ],
  allowCredentials: false,
};

interface Authorizer {
  name: string;
  type: string;
  arn: {
    "Fn::GetAtt": string[];
  };
}
const authorizer: Authorizer = {
  name: "authorizer",
  type: "COGNITO_USER_POOLS",
  arn: { "Fn::GetAtt": ["CognitoUserPool", "Arn"] },
};

const functions: AWS["functions"] = {
  getTodos: {
    handler: "src/functions/getTodos/index.handler",
    events: [
      {
        http: {
          method: "GET",
          path: "todos",
          cors: corsSettings,
          authorizer,
        },
      },
    ],
  },
  saveTodos: {
    handler: "src/functions/saveTodos/index.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "todos",
          cors: corsSettings,
          authorizer,
        },
      },
    ],
  },
  deleteTodos: {
    handler: "src/functions/deleteTodos/index.handler",
    events: [
      {
        http: {
          method: "DELETE",
          path: "todos",
          cors: corsSettings,
          authorizer,
        },
      },
    ],
  },
};

export default functions;
