import { handlerPath } from "@libs/handler-resolver";

type CognitoUserPoolEvent = {
  pool: string;
  trigger:
    | "PostConfirmation"
    | "PreSignUp"
    | "PreAuthentication"
    | "PostAuthentication"
    | "PreTokenGeneration"
    | "CustomMessage"
    | "DefineAuthChallenge"
    | "CreateAuthChallenge"
    | "VerifyAuthChallengeResponse"
    | "UserMigration"
    | "CustomSMSSender"
    | "CustomEmailSender";
  existing: boolean;
};

const event: CognitoUserPoolEvent = {
  pool: "userpool-curso",
  trigger: "PostConfirmation",
  existing: true,
};

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: event,
    },
  ],
};
