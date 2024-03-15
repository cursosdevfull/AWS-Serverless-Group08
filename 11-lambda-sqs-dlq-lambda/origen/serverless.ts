import execute from "@functions/execute";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "origen",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      URL_SQS_DESTINO: { Ref: "SQSQueue" },
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["sqs:SendMessage"],
            Effect: "Allow",
            Resource: "arn:aws:sqs:*:*:*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { execute },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      DynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Failures",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "origen-queue-standard",
          VisibilityTimeout: 10,
          RedrivePolicy: {
            deadLetterTargetArn: { "Fn::GetAtt": ["SQSQueueDLQ", "Arn"] },
            maxReceiveCount: 1,
          },
        },
      },
      SQSQueueDLQ: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "dlq-queue",
          VisibilityTimeout: 10,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
