const admin = require("../server/config/firebase-config");

const winston = require("winston");
const consoleTransport = new winston.transports.Console();

const myWinstonOptions = {
  transports: [consoleTransport],
};

const logger = new winston.createLogger(myWinstonOptions);

class Middleware {
  async decodeToken(req, res, next) {
    let token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    logger.info("before" + token);
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.json({ message: "Unauthorize" });
    } catch (e) {
      let responseMessage = {};
      if (e.code === "auth/id-token-expired") {
        res.status(401);
        responseMessage = { code: 401, message: "Unauthorized" };
      } else if (e.code === "auth/argument-error") {
        res.status(403);
        responseMessage = { code: 403, message: "Forbidden" };
      } else {
        responseMessage = { code: 500, message: "Internal Server Error" };
      }
      return res.json(responseMessage);
    }
  }
}

module.exports = new Middleware();
