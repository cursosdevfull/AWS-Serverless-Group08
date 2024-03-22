const handler = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        message: "Hello from client!",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = handler;
