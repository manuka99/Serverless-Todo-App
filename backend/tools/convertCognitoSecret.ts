import * as crypto from "crypto";

const getSecret = () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    return console.log("Required, username, client id and client secret");
  }
  const username = args[0];
  const clientId = args[1];
  const clientSecret = args[2];
  const digest = crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
  console.log(digest);
};

getSecret();
