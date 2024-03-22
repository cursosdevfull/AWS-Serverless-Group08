import { TokenService } from "@functions/services/Token.service";

const handler = async (event) => {
  console.log("event", event);
  const { authorizationToken, methodArn } = event;

  try {
    const payload: any = await TokenService.verifyToken(authorizationToken);

    const id = payload.id;
    const context = {
      roles: JSON.stringify(payload.roles),
    };

    return GeneratePolicy(id, "Allow", methodArn, context);
  } catch (error) {
    console.log("error", error);
    return GeneratePolicy("", "Deny", methodArn, {});
  }
};

function GeneratePolicy(
  principalId: string,
  effect: string,
  methodArn: string,
  context: object
) {
  const pdoc: any = {};
  pdoc.Version = "2012-10-17";
  pdoc.Statement = [];

  const stm: any = {};
  stm.Action = "execute-api:Invoke";
  stm.Effect = effect;
  stm.Resource = methodArn;

  pdoc.Statement.push(stm);

  return {
    principalId,
    policyDocument: pdoc,
    context,
  };
}

export const main = handler;
