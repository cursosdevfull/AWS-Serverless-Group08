import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from "@aws-sdk/client-ses";

// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import
const client = new SESClient();

const send = async (event) => {
  const input: SendEmailCommandInput = {
    Source: "cursoawsgroup05@gmail.com",
    Destination: {
      ToAddresses: ["cursoawsgroup05@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Data: "<h1>Hello from SES!</h1>",
        },
      },
      Subject: {
        Data: "Hello from SES!",
      },
    },
  };

  console.log(input);

  const command = new SendEmailCommand(input);
  const response = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "send" }),
  };
};

export const main = send;
