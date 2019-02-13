const express = require("express");
const { User } = require("../../models/User");
const { Trip } = require("../../models/Trip");
const { VehicleType } = require("../../models/VehicleType");
const { Vehicle, validate } = require("../../models/Vehicle");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const router = express.Router();

// Trip Model

//@route GET api/trips
//@desc get all trips
//@access Public
router.get("/", auth, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.send(vehicles);
});

//@route GET api/vehicle/:id
//@desc get a vehicle
//@access Public
router.get("/:id", auth, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id).select("-__v");
  if (!vehicle)
    return res.status(404).send("The vehicle with the given id was not found.");

  res.send(vehicle);
});

//@route GET /api/vehicles/available/:id
//@desc get vehicles that are available for trip
//@access Private
router.get("/available/:id", [auth, admin], async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip)
    return res.status(404).send("The trip with the given Id was not found.");

  const conflictedVehicles = await Trip.aggregate([
    {
      $unwind: "$vehicles"
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
        _id: "$vehicles._id",
        name: "$vehicles.name"
      }
    }
  ]);

  const conflictedVehiclesIdArray = conflictedVehicles.map(vehicle => {
    return vehicle._id;
  });

  const availableVehicles = await Vehicle.find({
    _id: { $nin: conflictedVehiclesIdArray }
  });
  console.log(availableVehicles);
  res.send(availableVehicles);
});

//@route POST api/trips
//@desc create a trip
//@access Public
router.post("/", [auth, admin], async (req, res) => {
  console.log(req.body.vehicleTypeId);
  const vehicleType = await VehicleType.findById(req.body.vehicleTypeId);
  console.log(vehicleType);
  if (!vehicleType) return res.status(400).send("Invalid vehicle type.");

  const vehicle = new Vehicle({
    name: req.body.name,
    vehicleType: {
      _id: vehicleType._id,
      name: vehicleType.name
    },
    maxOccupancy: req.body.maxOccupancy,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    isBus: req.body.isBus,
    driverNeeded: req.body.driverNeeded
  });
  await vehicle.save();
  res.send(vehicle);
});

//@route PUT api/users
//@desc update a user
//@access Public
router.put("/:id", [auth, admin], async (req, res) => {
  const vehicleType = await VehicleType.findById(req.body.vehicleTypeId);
  if (!vehicleType) return res.status(400).send("Invalid vehicle type.");

  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    vehicleType: {
      _id: vehicleType._id,
      name: vehicleType.name
    },
    maxOccupancy: req.body.maxOccupancy,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    isBus: req.body.isBus,
    driverNeeded: req.body.driverNeeded
  });

  if (!vehicle)
    return res.status(404).send("The vehicle with the given ID was not found.");
  res.send(vehicle);
});

//@route DELETE api/vehicles
//@desc delte a vehicle
//@access Public
router.delete("/:id", [auth, admin], async (req, res) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if (!vehicle)
    return res.status(404).send("The vehicle with the given ID was not found.");

  res.send(vehicle);
});

module.exports = router;
