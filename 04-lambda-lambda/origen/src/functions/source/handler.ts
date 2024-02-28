import { IMessage, Service } from "./service";

const source = async (event) => {
  const { name, url } = JSON.parse(event.body);

  const message: IMessage = {
    action: "schedule",
    data: {
      name,
      url,
    },
  };

  await Service.invokeLambda(message, "destino-dev-destination");

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};

export const main = source;
