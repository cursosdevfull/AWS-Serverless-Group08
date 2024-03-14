import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient();

type ITEM = {
  [key: string]: { S: string } | { N: string };
};

const insert = async (event) => {
  console.log(event);

  const body = JSON.parse(event.body);
  const record: ITEM = {
    id: { S: uuidv4() },
    name: { S: body.name },
    age: { N: body.age.toString() },
    email: { S: body.email },
    date: { S: new Date().toISOString() },
  };

  console.log("record", record);
  const params = {
    TableName: "Users",
    Item: record,
  };

  console.log("params", params);

  const command = new PutItemCommand(params);
  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "insert function",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = insert;
