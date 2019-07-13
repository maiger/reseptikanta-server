    
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/reseptikanta"
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  keepAlive: true,
  useFindAndModify: false
});

module.exports.Recipe = require("./models/recipe");