import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

const list = async (event) => {
  const params = { TableName: "Users" };

  const command = new ScanCommand(params);
  const response = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "list function",
        output: response.Items.map((item) => ({
          id: item.id.S,
          name: item.name.S,
          age: Number(item.age.N),
          email: item.email.S,
          date: item.date.S,
        })),
      },
      null,
      2
    ),
  };
};

export const main = list;
