import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient();

const postconfirmation = async (event, context: any, callback: any) => {
  console.log("event", event);
  const { userName, userPoolId } = event;

  try {
    await addUserToGroup({
      userPoolId,
      username: userName,
      groupName: "operator",
    });

    return callback(null, event);
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

async function addUserToGroup({ userPoolId, username, groupName }) {
  const params = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: username,
  };

  const command = new AdminAddUserToGroupCommand(params);
  const response = await client.send(command);

  console.log(response);
}

export const main = postconfirmation;
