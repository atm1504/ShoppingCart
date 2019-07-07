const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (Callback) => {
  MongoClient
      .connect(
          'mongodb+srv://atm1504:11312113@cluster0-yb5xu.mongodb.net/shop?retryWrites=true&w=majority')
      .then(client => {
        console.log('Connected!');
        _db = client.db();
        Callback(client);
      })
      .catch(err => {
        console.log(err);
        // throw(err);
      });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw 'No database found!';
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;