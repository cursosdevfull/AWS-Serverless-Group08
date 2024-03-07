import {
  PublishCommand,
  PublishCommandInput,
  SNSClient,
} from "@aws-sdk/client-sns";

const client = new SNSClient();

const execute = async (event) => {
  const params: PublishCommandInput = {
    TopicArn: "arn:aws:sns:us-east-1:282865065290:my-topic",
    Message: event.body,
  };

  const command = new PublishCommand(params);
  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  };
};

export const main = execute;
