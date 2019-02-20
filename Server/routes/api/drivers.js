const express = require("express");
const driver = require("../../middleware/driver");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const _ = require("lodash");
const router = express.Router();
const { Trip } = require("../../models/Trip");
const { User, userSchema } = require("../../models/User");

//@route GET /api/drivers
//@desc get all trips by driver
//@access Private
router.get("/", [auth, driver], async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(404).send("User ID could not be found.");

  const trips = await Trip.find({ "drivers._id": me }).sort({
    departTime: 1
  });
  res.send(trips);
});

//@route GET /api/drivers
//@desc get a trip by driver
//@access Private
router.get("/:id", [auth, driver], async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(404).send("User ID could not be found.");
  const trip = await Trip.findById(req.params.id);
  res.send(trip);
});

//@route GET /api/drivers/:id
//@desc get drivers available for trip
//@access Private
router.get("/available/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) return res.status(404).send("Trip with given ID not found");

  const conflictedDrivers = await Trip.aggregate([
    {
      $unwind: "$drivers"
    },
    {
      $match: {
        _id: { $ne: trip._id },
        $or: [
          {
            departTime: {
              $gte: new Date(trip.departTime),
              $lte: new Date(trip.returnTime)
            }
          },
          {
            returnTime: {
              $gte: new Date(trip.departTime),
              $lte: new Date(trip.returnTime)
            }
          }
        ]
      }
    },
    {
      $project: {
        _id: "$drivers._id",
        name: "$drivers.name",
        email: "$drivers.email"
      }
    }
  ]);

  const conflictedDriversIdArray = conflictedDrivers.map(driver => {
    return driver._id;
  });

  const availableDrivers = await User.find({
    $and: [{ _id: { $nin: conflictedDriversIdArray } }, { isDriver: true }]
  });
  res.send(availableDrivers);
});

module.exports = router;
