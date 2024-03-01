const execute = async (event) => {
  console.log("execute", event);

  if (event.Records) {
    event.Records.forEach((record) => {
      try {
        const body = JSON.parse(record.body);
        console.log("body", body);
      } catch (error) {
        throw error;
      }
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "execute",
      input: event,
    }),
  };
};

export const main = execute;
