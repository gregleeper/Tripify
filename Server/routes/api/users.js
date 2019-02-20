const express = require("express");
const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const admin = require("../../middleware/admin");
const _ = require("lodash");
const router = express.Router();
const { User, validate } = require("../../models/User");

//@route GET api/users
//@desc get all users
//@access Admin
router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});

//@route GET api/users/supervisors
//@desc get all users who are supervisors
//@access Public
router.get("/supervisors", auth, async (req, res) => {
  const supervisors = await User.find({ isSupervisor: true }).sort({ name: 1 });
  res.send(supervisors);
});

//@route GET api/users/drivers
//@desc get all users who are drivers
//@access Public
router.get("/drivers", auth, async (req, res) => {
  const drivers = await User.find({ isDriver: true }).sort({ name: 1 });
  res.send(drivers);
});

//@route GET api/users/me
//@desc get a user
//@access Public
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given id was not found.");

  res.send(user);
});

//@route POST api/users
//@desc create a user
//@access Public
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "isSupervisor",
      "isAdmin",
      "isDriver"
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));

  //const token = user.generateAuthToken();
  // res
  //   .header("x-auth-token", token)
  //   .send(_.pick(user, ["_id", "name", "email"]));
});

//@route PUT api/users
//@desc update a user
//@access Public
router.put("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    isSupervisor: req.body.isSupervisor,
    isDriver: req.body.isDriver
  });

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

//@route DELETE api/users
//@desc delte a user
//@access Public
router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

module.exports = router;
