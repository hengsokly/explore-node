const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const genresRoute = require('./routes/genres');
const customerRoute = require('./routes/customers');

app.use(express.json());
app.use(function(req, res, next) {
  console.log('Logging....')
  next();
})

app.use('/api/genres', genresRoute);
app.use('/api/customers', customerRoute);

app.listen(port, () => {
  console.log('Listing to port ' + port)
})
