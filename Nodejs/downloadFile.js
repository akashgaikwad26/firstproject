const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const client = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com",
   //endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    }
});
// Specifies a path within your Space and the file to download.
const bucketParams = {
    Bucket: "pravinyam-programs",
    Key: "C6Float-ArithmeticOperatorDivision.txt"
  };
  
  // Function to turn the file's body into a string.
  const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  };
  
  // Downloads your file and saves its contents to /tmp/local-file.ext.
  const downloadFile = async () => {
    try {
      const response = await client.send(new GetObjectCommand(bucketParams));
      const data = await streamToString(response.Body);
      fs.writeFileSync("C:/Downloads/dinesh.txt", data);
      console.log("Success", data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  //downloadFile();

  module.exports=  {downloadFile}
