import {
  PublishCommand,
  PublishCommandInput,
  SNSClient,
} from "@aws-sdk/client-sns";

const client = new SNSClient();

const execute = async (event) => {
  const { countryISO, centerId, medicId, appointmentId, date, patientId } =
    JSON.parse(event.body);

  const args: PublishCommandInput = {
    TopicArn: process.env[`TOPIC_${countryISO}_ARN`],
    Message: JSON.stringify({
      countryISO,
      centerId,
      medicId,
      appointmentId,
      date,
      patientId,
    }),
  };

  const command = new PublishCommand(args);
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
