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
      logger.info("error occured " + e);
      return res.json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
