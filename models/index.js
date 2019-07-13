    
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/reseptikanta", {
  useNewUrlParser: true,
  keepAlive: true
});

module.exports.Recipe = require("./recipe");