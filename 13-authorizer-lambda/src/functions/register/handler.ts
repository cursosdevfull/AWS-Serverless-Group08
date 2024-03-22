import { CryptService } from "@functions/services/Crypt.service";
import { UserService } from "@functions/services/User.service";
import { v4 as uuidv4 } from "uuid";

const handler = async (event) => {
  console.log("event", event);
  let { name, email, password } = JSON.parse(event.body);

  const result = await UserService.getUserByEmail(email);

  console.log("result", result);
  console.log("result.Item", result.Item);

  if (!result.Item) {
    try {
      password = await CryptService.hashPassword(password);
      const id = uuidv4();
      console.log(id, name, email, password);
      await UserService.createUser(id, name, email, password);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "User created successfully!",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Internal server error!",
        }),
      };
    }
  } else {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "User already exists!",
    };
  }
};

export const main = handler;
