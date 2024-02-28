import {
  InvokeCommand,
  InvokeCommandInput,
  LambdaClient,
} from "@aws-sdk/client-lambda";

const client = new LambdaClient();

export interface IMessage {
  destination: "PE" | "CO" | "MX";
  data: { [key: string]: string | number };
}

export class Service {
  static async invokeLambda(message: IMessage, destinationLambdaName: string) {
    const args: InvokeCommandInput = {
      FunctionName: destinationLambdaName,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(message),
    };

    const command = new InvokeCommand(args);
    const result = await client.send(command);

    console.log("args", args);
    console.log("result", result);
  }
}
