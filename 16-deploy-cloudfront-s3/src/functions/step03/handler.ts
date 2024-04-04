const step03 = async (event) => {
  console.log("step03!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "step03!" }),
  };
};

export const main = step03;
