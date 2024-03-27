const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  }
}));

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required()
  })

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;