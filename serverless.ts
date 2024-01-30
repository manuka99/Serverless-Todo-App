import type { AWS } from "@serverless/typescript";

import functions from "./serverless/functions";
import DynamoResources from "./serverless/dynamodb";
import CognitoResources from "./serverless/cognitoResources";

const serverlessConfiguration: AWS = {
  service: "serverless-todos-app",
  frameworkVersion: "3",

  plugins: ["serverless-esbuild"],
  custom: {
    tables: {
      Todos: "${sls:stage}-${self:service}-todos",
    },
    profile: {
      dev: "admin",
      prod: "prod",
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    profile: "${self:custom.profile.${sls:stage}}",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      TodosTableName: "${self:custom.tables.Todos}",
      region: "${self:provider.region}",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "dynamodb:*",
        Resource: ["*"],
      },
    ],
  },
  functions,
  resources: {
    Resources: {
      ...DynamoResources,
      ...CognitoResources,
    },
    Outputs: {
      TodosTableName: {
        Value: '${self:custom.tables.Todos}',
        Export: {
          Name: 'TodosTableName',
        },
      },
      UserPoolId: {
        Value: { Ref: 'CognitoUserPool' },
        Export: {
          Name: 'UserPoolId',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
