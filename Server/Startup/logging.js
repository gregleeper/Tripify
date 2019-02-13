const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://admin:fixit87@ds227674.mlab.com:27674/usd210_transportation",
    level: "error"
  });
};
