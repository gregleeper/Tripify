const express = require("express");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const { Organization, validate } = require("../../models/Organization");
const router = express.Router();

router.get("/", async (req, res) => {
  const organization = await Organization.find()
    .select("-__v")
    .sort("name");
  res.send(organization);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let organization = new Organization({ name: req.body.name });
  organization = await organization.save();

  res.send(organization);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organization = await Organization.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!organization)
    return res
      .status(404)
      .send("The organization with the given ID was not found.");

  res.send(organization);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const organization = await Organization.findByIdAndRemove(req.params.id);

  if (!organization)
    return res
      .status(404)
      .send("The organization with the given ID was not found.");

  res.send(organization);
});

router.get("/:id", async (req, res) => {
  const organization = await Organization.findById(req.params.id).select(
    "-__v"
  );
  if (!organization)
    return res
      .status(404)
      .send("The organization with the given ID was not found.");

  res.send(organization);
});

module.exports = router;
