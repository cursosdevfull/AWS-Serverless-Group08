const execute = async (event) => {
  console.log(event);

  const response = { batchItemFailures: [] };
  const promises = event.Records.map(async (record) => {
    console.log("record.body", record.body);
    const body = JSON.parse(record.body);
    console.log("body", body);
    const { name, url } = body;
    console.log(name, url);

    if (name === "fail") {
      return { status: false, id: record.messageId };
    }
    return { status: true, id: record.messageId };
  });

  const settledPromises = await Promise.all(promises);

  settledPromises.forEach((promise) => {
    if (!promise.status) {
      response.batchItemFailures.push({ id: promise.id });
    }
  });

  return response;

  /* return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from the destination function!",
      input: event,
    }),
  }; */
};

export const main = execute;
