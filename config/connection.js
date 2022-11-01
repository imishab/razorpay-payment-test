const mongoClient = require("mongodb").MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url =
    " mongodb+srv://msb:msb.com001@cluster0.ixwqhvc.mongodb.net/?retryWrites=true&w=majority";
  const dbname = "payment";

  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) {
      return done(err);
    }
    state.db = data.db(dbname);

    done();
  });
};

module.exports.get = function () {
  return state.db;
};
