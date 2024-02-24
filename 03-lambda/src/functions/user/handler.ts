const userController = async (event: any = {}): Promise<any> => {
  const method = event.httpMethod;
  const path = event.path;

  console.log("method: ", method);
  console.log("path: ", path);

  return {
    statusCode: 200,
    body: "Response from userController",
  };
};

export { userController };
