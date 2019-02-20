const mongoose = require("mongoose");
const Joi = require("joi");
const { vehicleSchema } = require("./Vehicle");
const { userSchema } = require("./User");

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  destination: String,
  physicalAddress: String,
  departTime: Date,
  returnTime: Date,
  departureLocation: String,
  organization: {
    type: new mongoose.Schema({
      name: {
        type: String
      }
    })
  },
  distance: Number,
  cost: Number,
  occupants: Number,
  tripOwner: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 100
      }
    })
  },
  phoneNumber: String,
  vehicleTypeReq: {
    type: new mongoose.Schema({
      name: {
        type: String
      }
    })
  },
  numberOfPrimaryVehicles: Number,
  supportVehicles: Number,
  estimateNeeded: Boolean,
  numberOfDrivers: Number,
  totalVehicles: Number,
  comments: String,
  isDenied: Boolean,
  isArranged: {
    type: Boolean,
    default: false
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  supervisor: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 100
      }
    })
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  miles: { type: Array, default: [] },
  drivers: [userSchema],
  vehicles: [vehicleSchema]
});

const Trip = mongoose.model("Trip", tripSchema);

function validateTrip(trip) {
  const schema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(128),
    destination: Joi.string()
      .min(5)
      .max(50),
    physicalAddress: Joi.string(),
    departTime: Joi.date(),
    returnTime: Joi.date(),
    tripType: Joi.string(),
    departureLocation: Joi.string(),
    distance: Joi.string(),
    cost: Joi.number(),
    occupants: Joi.number()
      .min(1)
      .max(500),
    supervisor: Joi.object().required(),
    drivers: Joi.array(),
    phoneNumber: Joi.string(),
    vehicleTypeReq: Joi.object(),
    numberOfPrimaryVehicles: Joi.number(),
    supportVehicles: Joi.number(),
    estimateNeeded: Joi.boolean(),
    numberOfDrivers: Joi.number(),
    totalVehicles: Joi.number(),
    comments: Joi.string(),
    isArranged: Joi.boolean(),
    isApproved: Joi.boolean(),
    isDenied: Joi.boolean(),
    isComplete: Joi.boolean(),
    organization: Joi.object()
  };

  return Joi.validate(trip, schema);
}

exports.Trip = Trip;
exports.validate = validateTrip;
