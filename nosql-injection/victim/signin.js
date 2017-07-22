'use strict';

const _       = require('lodash');
const co      = require('co');
const mongodb = require('./mongodb');

module.exports.handler = co.wrap(function* (event, context, callback) {
  console.log(JSON.stringify(event));

  let signinReq = JSON.parse(event.body);
  if (!signinReq.username || !signinReq.password) {
    callback(null, { statusCode: 403 });
    return;
  }

  try {
    let db = yield mongodb.connect();

    console.log("finding user with matching username and password");

    let user = 
      yield db.collection('users')
        .findOne({
          username: signinReq.username,
          password: signinReq.password
        });

    if (!user) {
      callback(null, { statusCode: 403 });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(user)
    };

    callback(null, response);
  } catch (exn) {
    console.log(exn);
    callback(exn);
  }
});