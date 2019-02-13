const express = require("express");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const { VehicleType, validate } = require("../../models/VehicleType");
const router = express.Router();

router.get("/", async (req, res) => {
  const vehicleType = await VehicleType.find()
    .select("-__v")
    .sort("name");
  res.send(vehicleType);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let vehicleType = new VehicleType({ name: req.body.name });
  vehicleType = await vehicleType.save();

  res.send(vehicleType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const vehicleType = await VehicleType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!vehicleType)
    return res
      .status(404)
      .send("The vehicle type with the given ID was not found.");

  res.send(vehicleType);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const vehicleType = await VehicleType.findByIdAndRemove(req.params.id);

  if (!vehicleType)
    return res
      .status(404)
      .send("The vehicle type with the given ID was not found.");

  res.send(vehicleType);
});

router.get("/:id", async (req, res) => {
  console.log("get vt with id called");
  const vehicleType = await VehicleType.findById(req.params.id).select("-__v");
  console.log(vehicleType);
  if (!vehicleType)
    return res
      .status(404)
      .send("The vehicle type with the given ID was not found.");

  res.send(vehicleType);
});

module.exports = router;
