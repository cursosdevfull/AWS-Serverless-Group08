import {
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
} from "@aws-sdk/client-sqs";

const client = new SQSClient();

const queueUrls = {
  PE: process.env.URL_SQS_PE,
  CO: process.env.URL_SQS_CO,
  MX: process.env.URL_SQS_MX,
};

const execute = async (event) => {
  const { countryISO, centerId, medicId, appointmentId, date, patientId } =
    JSON.parse(event.body);

  const args: SendMessageCommandInput = {
    MessageBody: JSON.stringify({
      countryISO,
      centerId,
      medicId,
      appointmentId,
      date,
      patientId,
    }),
    QueueUrl: queueUrls[countryISO],
  };

  const command = new SendMessageCommand(args);
  const result = await client.send(command);
  console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "execute",
      input: { countryISO, centerId, medicId, appointmentId, date, patientId },
    }),
  };
};

export const main = execute;
