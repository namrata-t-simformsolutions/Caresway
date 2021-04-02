const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/caresway', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});