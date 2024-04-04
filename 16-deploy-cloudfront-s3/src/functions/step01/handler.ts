const step01 = async (event) => {
  console.log("step01!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "step01!" }),
  };
};

export const main = step01;
