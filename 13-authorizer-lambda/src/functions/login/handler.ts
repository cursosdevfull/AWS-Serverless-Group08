import { CryptService } from '@functions/services/Crypt.service';
import { TokenService } from '@functions/services/Token.service';
import { UserService } from '@functions/services/User.service';

const handler = async (event) => {
  let { email, password } = JSON.parse(event.body);

  const result = await UserService.getUserByEmail(email);

  console.log("result", result);

  if (result.Item) {
    try {
      const passwordMatched = await CryptService.comparePassword(
        password,
        result.Item.password.S
      );

      console.log("passwordMatched", passwordMatched);

      const roles = ["admin", "user"]

      if (passwordMatched) {
        const token = await TokenService.createToken(
          result.Item.id.S,
          result.Item.name.S,
          roles
        );

        console.log("token", token);
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            message: "Login successful!",
            token,
          }),
        };
      } else {
        return {
          statusCode: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: "Password does not match!",
        };
      }
    } catch (error) {
      console.log("error", error);
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
      body: "User not found!",
    };
  }
};

export const main = handler;
