
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/reseptikanta"
mongoose.set("debug", true);
mongoose.Promise = Promise;

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose
      const mockgoose = new Mockgoose(mongoose)

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            keepAlive: true,
            useFindAndModify: false
          })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            });
        })
    } else {
      mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        keepAlive: true,
        useFindAndModify: false
      })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  })
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close }