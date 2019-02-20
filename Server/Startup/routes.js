const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("../routes/api/auth");
const passport = require("passport");
const trips = require("../routes/api/trips");
const users = require("../routes/api/users");
const vehicles = require("../routes/api/vehicles");
const vehicleTypes = require("../routes/api/vehicleTypes");
const organizations = require("../routes/api/organizations");
const approvals = require("../routes/api/approvals");
const drivers = require("../routes/api/drivers");
const express = require("express");
const error = require("../middleware/error");
//const passportService = require("../Services/passport");

module.exports = function(app) {
  app.use(express.json());

  app.use(bodyParser.json());
  app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use("/api/trips", trips);
  app.use("/api/users", users);
  app.use("/api/vehicles", vehicles);
  app.use("/api/vehicletypes", vehicleTypes);
  app.use("/api/auth", auth);
  app.use("/api/approvals", approvals);
  app.use("/api/drivers", drivers);
  app.use("/api/organizations", organizations);

  // app.get(
  //   "/auth/google",
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"]
  //   })
  // );
  // app.get(
  //   "/auth/google/callback",
  //   passport.authenticate("google", {
  //     successRedirect: "/trips",
  //     failureRedirect: "/login",
  //     session: false
  //   }),

  //   function(req, res) {
  //     var token = TokenService.encode(req.user);
  //     res.redirect("/api?token=" + token);
  //   }
  // );

  // app.get(
  //   "/connect/google",
  //   auth,
  //   passport.authorize("google", { scope: ["profile", "email"] })
  // );

  // // the callback after google has authorized the user
  // app.get(
  //   "/connect/google/callback",
  //   auth,
  //   passport.authorize("google", {
  //     successRedirect: "/profile",
  //     failureRedirect: "/"
  //   })
  // );
  // app.get("/api/current_user", (req, res) => {
  //   console.log("called app.get");
  //   res.send(req.user);
  // });

  app.use(error);
};
