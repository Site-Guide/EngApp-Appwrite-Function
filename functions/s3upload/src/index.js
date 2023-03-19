const aws = require("aws-sdk");
const dotenv = require("dotenv");

module.exports = async function (req, res) {
  dotenv.config();
  const region = req.variables.region;
  const bucketName = req.variables.bucketName;
  const AWS_ACCESS_KEY_ID = req.variables.AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = req.variables.AWS_SECRET_ACCESS_KEY;
  const profile = req.variables.awsProfile;

  // aws.config.loadFromPath("../.aws/config.json");

  aws.config.update({
    region,
    accessKeyId: AWS_ACCESS_KEY_ID,
    accessSecretKey: AWS_SECRET_ACCESS_KEY,
    apiVersion: "latest",
  });

  const s3 = new aws.S3({
    region,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    profile,
    signatureVersion: "v4",
    apiVersion: "latest",
  });

  const payload = JSON.parse(req.payload);
  console.log(payload);
  console.log(region);
  console.log(bucketName);
  console.log(AWS_ACCESS_KEY_ID);
  console.log(AWS_SECRET_ACCESS_KEY);

  const imageName = payload.fileName;

  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  res.json({
    uploadURL: uploadURL,
  });
};
