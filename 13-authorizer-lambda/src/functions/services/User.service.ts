import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

export class UserService {
  static async getUserByEmail(email: string) {
    try {
      const params: GetItemCommandInput = {
        TableName: "Users",
        Key: {
          email: { S: email },
        },
      };

      const command = new GetItemCommand(params);
      return await client.send(command);
    } catch (error) {
      console.error("error", error);
      return null;
    }
  }

  static async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    try {
      const params = {
        TableName: "Users",
        Item: {
          id: { S: id },
          name: { S: name },
          email: { S: email },
          password: { S: password },
        },
      };

      const command = new PutItemCommand(params);
      return await client.send(command);
    } catch (error) {
      console.error("error", error);
      return null;
    }
  }
}
