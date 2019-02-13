const express = require("express");
const supervisor = require("../../middleware/supervisor");
const auth = require("../../middleware/auth");
const _ = require("lodash");
const router = express.Router();
const { Trip } = require("../../models/Trip");
const { User } = require("../../models/User");

//@route GET api/trips
//@desc get all trips by supervisor
//@access Private
router.get("/", [auth, supervisor], async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(404).send("User ID could not be found.");
  const trips = await Trip.find({ "supervisor._id": me }).sort({
    departTime: 1
  });
  res.send(trips);
});

//@route GET api/trips
//@desc get all trips by supervisor
//@access Private
router.get("/:id", [auth, supervisor], async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(404).send("User ID could not be found.");
  const trip = await Trip.findById(req.params.id);
  res.send(trip);
});

//@route PUT api/approvals
//@desc update an approval status of a trip
//@access Private
router.put("/:id", [auth, supervisor], async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(404).send("User ID could not be found.");
  const trip = await Trip.findByIdAndUpdate(req.params.id, {
    isApproved: req.body.isApproved,
    isDenied: req.body.isDenied
  });
  if (!trip)
    return res.status(404).send("The trip with the given ID was not found.");
  res.send(trip);
});

// //@route DELETE api/users
// //@desc delte a user
// //@access Public
// router.delete("/:id", admin, async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });

module.exports = router;
