
const mongoose = require("mongoose");
 
mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
 useCreateIndex: true,
 useFindAndModify: false,
});
 
const connection = mongoose.connection;
 
connection.once("open", function() {
 console.log("MongoDB database connection established successfully");
});