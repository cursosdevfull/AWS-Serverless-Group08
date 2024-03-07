import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "infraproyecto",
  frameworkVersion: "3",
  //plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    stage: "${opt:stage, 'dev'}",
    runtime: "nodejs18.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  package: { individually: true },
  resources: {
    Resources: {
      SQSPE: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSPE-${self:provider.stage}",
        },
      },
      SNSTOPICPE: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICPE-${self:provider.stage}",
          Subscription: [
            {
              Endpoint: { "Fn::GetAtt": ["SQSPE", "Arn"] },
              Protocol: "sqs",
            },
          ],
        },
      },
      SQSQUEUEPOLICYPE: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          Queues: [{ Ref: "SQSPE" }],
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: "*",
                Action: "sqs:SendMessage",
                Resource: { "Fn::GetAtt": ["SQSPE", "Arn"] },
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSTOPICPE" },
                  },
                },
              },
            ],
          },
        },
      },
      SSMTOPICPE: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/sns/TOPICPE",
          Type: "String",
          Value: { Ref: "SNSTOPICPE" },
        },
      },
      SSMSQSPEARN: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSPE/ARN",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSPE", "Arn"] },
        },
      },
      SSMSQSPEURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSPE/URL",
          Type: "String",
          Value: { Ref: "SQSPE" },
        },
      },
      SQSCO: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSCO-${self:provider.stage}",
        },
      },
      SNSTOPICCO: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICCO-${self:provider.stage}",
          Subscription: [
            {
              Endpoint: { "Fn::GetAtt": ["SQSCO", "Arn"] },
              Protocol: "sqs",
            },
          ],
        },
      },
      SQSQUEUEPOLICYCO: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          Queues: [{ Ref: "SQSCO" }],
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: "*",
                Action: "sqs:SendMessage",
                Resource: { "Fn::GetAtt": ["SQSCO", "Arn"] },
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSTOPICCO" },
                  },
                },
              },
            ],
          },
        },
      },
      SSMTOPICCO: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/sns/TOPICCO",
          Type: "String",
          Value: { Ref: "SNSTOPICCO" },
        },
      },
      SSMSQSCOARN: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSCO/ARN",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSCO", "Arn"] },
        },
      },
      SSMSQSCOURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSCO/URL",
          Type: "String",
          Value: { Ref: "SQSCO" },
        },
      },
      SQSMX: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSMX-${self:provider.stage}",
        },
      },
      SNSTOPICMX: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICMX-${self:provider.stage}",
          Subscription: [
            {
              Endpoint: { "Fn::GetAtt": ["SQSMX", "Arn"] },
              Protocol: "sqs",
            },
          ],
        },
      },
      SQSQUEUEPOLICYMX: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          Queues: [{ Ref: "SQSMX" }],
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: "*",
                Action: "sqs:SendMessage",
                Resource: { "Fn::GetAtt": ["SQSMX", "Arn"] },
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSTOPICMX" },
                  },
                },
              },
            ],
          },
        },
      },
      SSMTOPICMX: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/sns/TOPICMX",
          Type: "String",
          Value: { Ref: "SNSTOPICMX" },
        },
      },
      SSMSQSMXARN: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSMX/ARN",
          Type: "String",
          Value: { "Fn::GetAtt": ["SQSMX", "Arn"] },
        },
      },
      SSMSQSMXURL: {
        Type: "AWS::SSM::Parameter",
        Properties: {
          Name: "/infraproyecto/${self:provider.stage}/SQSMX/URL",
          Type: "String",
          Value: { Ref: "SQSMX" },
        },
      },
    },
    Outputs: {
      SQSPE: {
        Value: { "Fn::GetAtt": ["SQSPE", "Arn"] },
      },
      SQSCO: {
        Value: { "Fn::GetAtt": ["SQSCO", "Arn"] },
      },
      SQSMX: {
        Value: { "Fn::GetAtt": ["SQSMX", "Arn"] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
