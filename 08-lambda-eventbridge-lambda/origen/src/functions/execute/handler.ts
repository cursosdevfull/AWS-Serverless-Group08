import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient();

const input = {
  Entries: [
    {
      Source: "APP-MOBILE",
      DetailType: "appointment-updated",
      Detail: JSON.stringify({ name: "John Doe", date: "2022-01-01" }),
      EventBusName: "my-event-bus-cursos-dev",
    },
    {
      Source: "APP-MOBILE",
      DetailType: "appointment-cancelled",
      Detail: JSON.stringify({ name: "Joana Doe", date: "2022-01-01" }),
      EventBusName: "my-event-bus-cursos-dev",
    },
  ],
};

const execute = async (event) => {
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
