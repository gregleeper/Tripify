const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
//const passport = require("passport");
const _ = require("lodash");
const Joi = require("joi");
const router = express.Router();
const { User } = require("../../models/User");

//@route POST api/auth
//@desc authenticate a user
//@access Public

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password. ");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(token);
});

//@route GET /api/auth/google
//authenticate a user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//@route GET /api/auth/google/callback
// callback route for Google on login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: false
  }),

  function(req, res) {
    console.log(req);
    const token = req.user.generateAuthToken();
    res.cookie("token", token);
    res.header("x-auth-token", token).redirect("http://localhost:3000/");
  }
);

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
