const mongoose = require("mongoose");
const { vehicleTypeSchema } = require("./VehicleType");
const Joi = require("joi");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  vehicleType: {
    type: vehicleTypeSchema,
    name: String,
    required: false
  },
  maxOccupancy: {
    type: Number,
    min: 2,
    max: 150
  },
  year: {
    type: Number,
    min: 1999,
    max: 2100
  },
  make: {
    type: String,
    min: 2,
    max: 50
  },
  model: {
    type: String,
    min: 2,
    max: 50
  },
  isBus: {
    type: Boolean,
    default: false
  },
  driverNeeded: {
    type: Boolean,
    default: false
  }
});
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

function validateVehicle(vehicle) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    maxOccupancy: Joi.number()
      .min(2)
      .max(50)
      .required(),
    year: Joi.number()
      .min(1990)
      .max(2100)
  };

  return Joi.validate(vehicle, schema);
}

exports.validate = validateVehicle;
exports.Vehicle = Vehicle;
exports.vehicleSchema = vehicleSchema;
