const execute = async (event) => {
  console.log("execute", event);
  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  };
};

export const main = execute;
