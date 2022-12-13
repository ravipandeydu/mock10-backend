const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { EMIModel } = require("../models/EMI.model");

const emiRoutes = Router();

emiRoutes.get("/", async (req, res) => {
  const emi = await EMIModel.find();
  res.send(emi);
});

emiRoutes.post("/create", async (req, res) => {
  const { principle, rate, tenure } = req.body;
  let r = (rate/12)/100;
  const emi = principle * r * (( 1 + r )**tenure) / ( ( 1 + r )**tenure - 1 );
  const total= emi*tenure;
  const interest = total-principle;
  const newemi = new EMIModel({
    principle,
    rate,
    tenure,
    emi,
    total,
    interest
  });
  try {
    await newemi.save();
    res.send("emi created");
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  emiRoutes,
};
