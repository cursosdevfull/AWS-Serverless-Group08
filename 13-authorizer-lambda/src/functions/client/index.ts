import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "client",
        cors: true,
        passThrough: "WHEN_NO_MATCH",
        authorizer: "authorizer",
      },
    },
  ],
};
