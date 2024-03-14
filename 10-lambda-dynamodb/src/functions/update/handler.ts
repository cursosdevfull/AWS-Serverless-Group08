import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

type ITEM = {
  [key: string]: { S: string } | { N: string };
};

const update = async (event) => {
  console.log(event);

  const body = JSON.parse(event.body);

  const params = {
    TableName: "Users",
    UpdateExpression: "set #temp1 = :name, age = :age, email = :email",
    ExpressionAttributeValues: {
      ":name": { S: body.name },
      ":age": { N: body.age.toString() },
      ":email": { S: body.email },
    },
    ExpressionAttributeNames: {
      "#temp1": "name",
    },
    Key: {
      id: { S: body.id },
    },
  };

  console.log("params", params);

  const command = new UpdateItemCommand(params);
  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "update function",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = update;
