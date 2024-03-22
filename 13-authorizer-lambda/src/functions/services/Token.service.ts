import * as jwt from "jsonwebtoken";

export class TokenService {
  static createToken(id: string, name: string, roles: string[]) {
    return jwt.sign({ id, name, roles }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  static verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }

        resolve(decoded);
      });
    });
  }
}
