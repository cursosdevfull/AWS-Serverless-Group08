import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
} from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient();

const execute = async (event) => {
  const { body } = event;
  console.log("body", body);

  const input: PutEventsCommandInput = {
    Entries: [
      {
        Source: "appointment-medic",
        DetailType: "appointment-scheduled",
        Detail: body,
        EventBusName: "EventBusEB",
      },
    ],
  };

  const command = new PutEventsCommand(input);
  const response = await client.send(command);

  console.log("response", response);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "execute function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = execute;
