const execute = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "execute function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

export const main = execute;
