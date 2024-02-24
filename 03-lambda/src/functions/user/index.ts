import { handlerPath } from "@libs/functions";

const config = {
  handler: `${handlerPath(__dirname)}/handler.userController`,
  events: [
    {
      http: {
        method: "get",
        path: "list",
      },
    },
    {
      http: {
        method: "post",
        path: "create",
      },
    },
  ],
};

export default config;
