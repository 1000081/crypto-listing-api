// import { networOptions } from "../config/privateKey";
const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");
// const serviceAccount = require("../config/privateKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
