const express = require("express");
const cookieSession = require("cookie-session");

const passport = require("passport");
const winston = require("winston");
const keys = require("./config/keys");
const app = express();

require("./Startup/logging")();
require("./Startup/routes")(app);
require("./Startup/db")();
require("./Startup/config")();
require("./Startup/validation")();
require("./Services/passport");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5005;

app.listen(port, () => winston.info(`Server started on port ${port}`));
