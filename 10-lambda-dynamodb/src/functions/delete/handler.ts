import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

type ITEM = {
  [key: string]: { S: string } | { N: string };
};

const deleteRecord = async (event) => {
  console.log(event);

  const { id } = JSON.parse(event.body);

  const params = {
    TableName: "Users",
    Key: {
      id: { S: id },
    },
  };

  console.log("params", params);

  const command = new DeleteItemCommand(params);
  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "delete function",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = deleteRecord;
