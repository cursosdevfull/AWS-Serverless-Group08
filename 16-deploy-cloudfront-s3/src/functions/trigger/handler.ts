const trigger = async (event) => {
  console.log("Triggered!");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Triggered!" }),
  };
};

export const main = trigger;
