import { IMessage, Service } from "./service";

const destinations = {
  PE: "appointment-pe-dev-execute",
  CO: "appointment-co-dev-execute",
  MX: "appointment-mx-dev-execute",
};

const execute = async (event) => {
  console.log("body", JSON.parse(event.body));
  const { countryISO, centerId, medicId, appointmentId, date, patientId } =
    JSON.parse(event.body);

  const message: IMessage = {
    destination: countryISO,
    data: { centerId, medicId, appointmentId, date, patientId },
  };

  try {
    await Service.invokeLambda(message, destinations[countryISO]);
    return {
      statusCode: 200,
      body: event.body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export const main = execute;
