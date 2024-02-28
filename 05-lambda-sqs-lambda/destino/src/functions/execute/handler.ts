const execute = async (event) => {
  console.log("execute", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "execute",
      input: event,
    }),
  };
};

export const main = execute;
