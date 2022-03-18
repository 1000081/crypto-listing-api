const admin = require("firebase-admin");

const googleServiceAccountCreds = process.env.FIRE_BASE_SYSTEM_ACCOUNT;

console.log(
  "googleServiceAccountCreds-----------------" +
    process.env.FIRE_BASE_SYSTEM_ACCOUNT
);

if (!googleServiceAccountCreds)
  throw new Error(
    "The $FIRE_BASE_SYSTEM_ACCOUNT environment variable was not found!"
  );

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      Buffer.from(googleServiceAccountCreds, "base64").toString("ascii")
    )
  ),
});

module.exports = admin;
