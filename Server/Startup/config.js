const config = require("config");

module.exports = function() {
  //console.log(config.get("jwtPrivateKey"));
  if (!config.get("jwtPrivateKey")) {
    throw new Error(Error);
  }
};
