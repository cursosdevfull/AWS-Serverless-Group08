const hello = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World!" }),
  };
};

export const main = hello;
