import type { AWS } from '@serverless/typescript';

const DynamoResources: AWS['resources']['Resources'] = {
  TodosTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:custom.tables.Todos}',
      AttributeDefinitions: [
        {
          AttributeName: 'user_id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'todo_id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'user_id',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'todo_id',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
};

export default DynamoResources;
