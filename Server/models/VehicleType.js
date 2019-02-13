const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const vehicleTypeSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 20
  }
});

const VehicleType = mongoose.model("VehicleType", vehicleTypeSchema);

function validateVehicleType(vehicleType) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };

  return Joi.validate(vehicleType, schema);
}

exports.vehicleTypeSchema = vehicleTypeSchema;
exports.VehicleType = VehicleType;
exports.validate = validateVehicleType;
