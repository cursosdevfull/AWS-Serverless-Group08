import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: { arn: "arn:aws:sqs:us-east-1:282865065290:SQS_ORIGEN_DESTINO" },
    },
  ],
};