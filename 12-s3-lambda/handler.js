"use strict";

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client();

module.exports.execute = async (event) => {
  console.log(event.Records[0].s3);

  const s3 = event.Records[0].s3;
  const Bucket = s3.bucket.name;
  const Key = s3.object.key;

  const input = {
    Bucket,
    Key,
  };

  const command = new GetObjectCommand(input);
  const response = await client.send(command);

  const body = response.Body.toString("utf-8");
  console.log("body", body);

  console.log("response", response);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
