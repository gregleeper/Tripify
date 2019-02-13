const express = require("express");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { User } = require("../../models/User");
const { Vehicle } = require("../../models/Vehicle");
const { VehicleType } = require("../../models/VehicleType");
const { Trip, validate } = require("../../models/Trip");
const mongoose = require("mongoose");
const router = express.Router();

// Trip Model

//@route GET api/trips
//@desc get all trips by user
//@access Private
router.get("/", auth, async (req, res) => {
  const me = await User.findById(req.user._id);
  console.log(me);
  const trips = await Trip.find({ "tripOwner._id": me }).sort({
    departTime: -1
  });
  res.send(trips);
});

//@route GET api/trips/admin/
//@desc get all trips for admin
router.get("/admin", [auth, admin], async (req, res) => {
  const trips = await Trip.find({ departTime: { $gte: Date.now() } }).sort({
    departTime: 1
  });
  res.send(trips);
});

//@route GET api/trips/admin/
//@desc get a trip for admin
router.get("/admin/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findById(req.params.id).select("-__v");
  if (!trip)
    return res.status(400).send("The trip with given id was not found.");
  res.send(trip);
});

//@route GET api/trips/:id
//@desc get a trip
//@access Private
router.get("/:id", auth, async (req, res) => {
  const me = await User.findById(req.user._id);
  if (!me) return res.status(400).send("The user was not found.");
  const trip = await Trip.findById(req.params.id)
    .and({ "tripOwner._id": me })
    .select("-__v");
  if (!trip)
    return res.status(404).send("The trip with the given id was not found.");

  res.send(trip);
});

//@route GET api/trips/admin/:id
//@desc get a trip
//@access Private
router.get("/admin/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findById(req.params.id)
    .and({ "tripOwner.id": me })
    .select("-__v");
  if (!trip)
    return res.status(404).send("The trip with the given id was not found.");

  res.send(trip);
});

//@route POST api/trips
//@desc create a trip
//@access Public
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tripOwner = await User.findOne({ _id: req.user });
  if (!tripOwner) return res.status(400).send("Invalid trip owner");

  const supervisor = await User.findOne({ _id: req.body.supervisor });
  if (!supervisor) return res.status(400).send("Invalid supervisor id");

  const vehicleType = await VehicleType.findOne({
    _id: req.body.vehicleTypeReq
  });
  if (!vehicleType) return res.status(400).send("Invalid vehicle type id");

  let trip = new Trip({
    title: req.body.title,
    destination: req.body.destination,
    physicalAddress: req.body.physicalAddress,
    departTime: req.body.departTime,
    returnTime: req.body.returnTime,
    occupants: req.body.occupants,
    departureLocation: req.body.departureLocation,
    isApproved: req.body.isApproved,
    organization: req.body.organization,
    tripOwner: {
      _id: tripOwner._id,
      name: tripOwner.name,
      email: tripOwner.email
    },
    phoneNumber: req.body.phoneNumber,
    supervisor: {
      _id: supervisor._id,
      name: supervisor.name,
      email: supervisor.email
    },
    vehicleTypeReq: {
      _id: vehicleType._id,
      name: vehicleType.name
    },
    numberOfPrimaryVehicles: req.body.numberOfPrimaryVehicles,
    supportVehicles: req.body.supportVehicles,
    estimateNeeded: req.body.estimateNeeded,
    numberOfDrivers: req.body.numberOfDrivers,
    totalVehicles: req.body.totalVehicles,
    comments: req.body.comments
  });
  await trip.save();
  res.send(trip);
});

router.put("/admin/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, {
    $set: {
      distance: req.body.distance,
      cost: req.body.cost,
      drivers: req.body.drivers,
      vehicles: req.body.vehicles,
      isArranged: req.body.isArranged
    }
  });
  if (!trip)
    return res.status(404).send("The trip with given Id was not found.");
  res.send(trip);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tripOwner = await User.findOne({ _id: req.user });
  if (!tripOwner) return res.status(400).send("Invalid trip owner");

  const supervisor = await User.findOne({ _id: req.body.supervisor });
  if (!supervisor) return res.status(400).send("Invalid supervisor id");

  const vehicleType = await VehicleType.findOne({
    _id: req.body.vehicleTypeReq
  });
  if (!vehicleType) return res.status(400).send("Invalid vehicle type id");
  const trip = await Trip.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    destination: req.body.destination,
    physicalAddress: req.body.physicalAddress,
    departTime: req.body.departTime,
    returnTime: req.body.returnTime,
    occupants: req.body.occupants,
    departureLocation: req.body.departureLocation,
    isApproved: req.body.isApproved,
    organization: req.body.organization,
    tripOwner: {
      _id: tripOwner._id,
      name: tripOwner.name,
      email: tripOwner.email
    },
    phoneNumber: req.body.phoneNumber,
    supervisor: {
      _id: supervisor._id,
      name: supervisor.name,
      email: supervisor.email
    },
    vehicleTypeReq: {
      _id: vehicleType._id,
      name: vehicleType.name
    },
    numberOfPrimaryVehicles: req.body.numberOfPrimaryVehicles,
    supportVehicles: req.body.supportVehicles,
    estimateNeeded: req.body.estimateNeeded,
    numberOfDrivers: req.body.numberOfDrivers,
    totalVehicles: req.body.totalVehicles,
    comments: req.body.comments
  });
  if (!trip)
    return res.status(404).send("The trip with given Id was not found.");
  console.log("trip: ", trip);
  res.send(trip);
});

router.delete("/:id", auth, async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip)
    return res.status(404).send("The trip with given Id was not found.");
  res.send(trip);
});

//@route DELETE trip
//@desc deletes a trip wit given id
router.delete("/admin/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip)
    return res.status(404).send("The trip with the given id was not found.");
  res.send(trip);
});

module.exports = router;
