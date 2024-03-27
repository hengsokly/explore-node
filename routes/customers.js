const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

// Index--------------------
router.get('/', async(req, res) => {
  const customers = await Customer.find().sort('name');
  
  return res.send(customers)
})

// Show--------------------
router.get("/:id", async(req, res) => {
  // Find the customer
  const customer = await Customer.findById(req.params.id);

  // If not exist, return 404
  if(!customer) return res.status(404).send("The customer is not found")

  // Return the customer
  return res.send(customer)
})

// Create--------------------
router.post('/', async(req, res) => {
  // validate the customer
  const {error, value} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({
    name: req.body.name, 
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  try {
    customer = await customer.save();
  } catch (error) {
    console.log(error.errors);
  }

  res.send(customer);
})

// Update--------------------
router.put("/:id", async(req, res) => {
  // validate the customer
  const {error, value} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  // Find the customer
  let customer = await Customer.findById(req.params.id); 

  // If not exist, return 404
  if(!customer) return res.status(404).send("The customer is not found")

  // Update customer
  customer.name = value.name
  customer = await customer.save();

  // Return the customer
  return res.send(customer)
})

// Delete--------------------
router.delete("/:id", async(req, res) => {
  // Find the customer
  const customer = await Customer.findById(req.params.id);
  
  // If not exist, return 404
  if(!customer) return res.status(404).send("The customer is not found")

  // Delete customer
  const result = await Customer.deleteOne({_id: customer.id});

  // Return empty object
  return res.send({})
})

module.exports = router;