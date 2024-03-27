import client from "@functions/client";
import postconfirmation from "@functions/postconfirmation";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "authorizer-cognito",
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
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "cognito-idp:AdminAddUserToGroup",
              "cognito-idp:AdminRemoveUserFromGroup",
            ],
            Resource: "*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { client, postconfirmation },
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
      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "userpool-curso",
          AutoVerifiedAttributes: ["email"],
          Schema: [
            {
              Name: "email",
              Required: true,
              Mutable: true,
              AttributeDataType: "String",
            },
            {
              Name: "family_name",
              Required: true,
              Mutable: true,
              AttributeDataType: "String",
            },
          ],
          EmailVerificationSubject: "Verifique su cuenta",
          EmailVerificationMessage: "Hola. Tu código de verificación es {####}",
        },
      },
      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "userpool-curso-cliente",
          UserPoolId: { Ref: "CognitoUserPool" },
          GenerateSecret: false,
          ExplicitAuthFlows: [
            "ALLOW_USER_PASSWORD_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH",
            "ALLOW_USER_SRP_AUTH",
          ],
        },
      },
      CognitoAuthorizer: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          Name: "authorizer-curso",
          IdentitySource: "method.request.header.Authorization",
          RestApiId: { Ref: "ApiGatewayRestApi" },
          Type: "COGNITO_USER_POOLS",
          ProviderARNs: [{ "Fn::GetAtt": ["CognitoUserPool", "Arn"] }],
        },
      },
      CognitoGroupAdmin: {
        Type: "AWS::Cognito::UserPoolGroup",
        Properties: {
          GroupName: "admin",
          UserPoolId: { Ref: "CognitoUserPool" },
        },
      },
      CognitoGroupOperator: {
        Type: "AWS::Cognito::UserPoolGroup",
        Properties: {
          GroupName: "operator",
          UserPoolId: { Ref: "CognitoUserPool" },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
