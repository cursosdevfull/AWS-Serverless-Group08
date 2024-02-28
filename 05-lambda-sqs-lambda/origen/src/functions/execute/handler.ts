import {
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
} from "@aws-sdk/client-sqs";

const client = new SQSClient();

const execute = async (event) => {
  const { name, url } = JSON.parse(event.body);

  const args: SendMessageCommandInput = {
    MessageBody: JSON.stringify({ name, url }),
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/282865065290/SQS_ORIGEN_DESTINO",
  };

  const command = new SendMessageCommand(args);
  const result = await client.send(command);
  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "execute",
      input: { name, url },
    }),
  };
};

export const main = execute;
