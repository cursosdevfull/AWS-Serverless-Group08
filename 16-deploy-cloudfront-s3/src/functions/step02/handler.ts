const step02 = async (event) => {
  console.log("step02!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "step02!" }),
  };
};

export const main = step02;
