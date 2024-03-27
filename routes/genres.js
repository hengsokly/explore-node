const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');

// Index--------------------
router.get('/', async(req, res) => {
  const genres = await Genre.find().sort('name');
  
  return res.send(genres)
})

// Show--------------------
router.get("/:id", async(req, res) => {
  // Find the genre
  const genre = await Genre.findById(req.params.id);

  // If not exist, return 404
  if(!genre) return res.status(404).send("The genre is not found")

  // Return the genre
  return res.send(genre)
})

// Create--------------------
router.post('/', async(req, res) => {
  // validate the genre
  const {error, value} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  const genre = new Genre({name: req.body.name});

  try {
    const genre = await genre.save();
  } catch (error) {
    console.log(error.errors);
  }

  res.send(genre);
})

// Update--------------------
router.put("/:id", async(req, res) => {
  // validate the genre
  const {error, value} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  // Find the genre
  const genre = await Genre.findById(req.params.id); 

  // If not exist, return 404
  if(!genre) return res.status(404).send("The genre is not found")
  // Update genre
  
  genre.name = value.name
  const result = await genre.save();

  // Return the genre
  return res.send(genre)
})

// Delete--------------------
router.delete("/:id", async(req, res) => {
  // Find the genre
  const genre = await Genre.findById(req.params.id);

  // If not exist, return 404
  if(!genre) return res.status(404).send("The genre is not found")
  
  // Delete genre
  const result = await Genre.deleteOne({_id: genre.id});

  // Return empty object
  return res.send({})
})

module.exports = router;