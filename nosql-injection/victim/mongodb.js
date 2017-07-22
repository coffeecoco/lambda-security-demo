'use strict';

const co          = require('co');
const Promise     = require('bluebird');
const MongoDB     = require('mongodb');
const mongoClient = Promise.promisifyAll(MongoDB.MongoClient);

let connString = process.env.mongodb_conn;

// initialized on the first call, then cached
let mongoDb;

let connect = co.wrap(function* () {
  if (mongoDb !== undefined) {
    return mongoDb;
  }

  mongoDb = yield mongoClient.connectAsync(connString);
  console.log("connected to mongo");
  return mongoDb;
});

module.exports = {
  connect
};