const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 20
  }
});

const Organization = mongoose.model("Organization", organizationSchema);

function validateOrganization(organization) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };

  return Joi.validate(organization, schema);
}

exports.organizationSchema = organizationSchema;
exports.Organization = Organization;
exports.validate = validateOrganization;
