const step04 = async (event) => {
  console.log("step04!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "step04!" }),
  };
};

export const main = step04;
