const execute = async (event) => {
  const { Records } = event;

  if (Records && Records.length > 0) {
    for (const record of Records) {
      const { Sns } = record;
      const { Message } = Sns;
      console.log("Message", Message);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ event }),
  };
};

export const main = execute;
