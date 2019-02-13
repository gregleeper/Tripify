const winston = require("winston");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

module.exports = function() {
  mongoose.connect(db).then(() => winston.info("MongoDB Connected..."));
};
