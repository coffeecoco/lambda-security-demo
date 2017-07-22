'use strict';

const json = require('do-not-download-this-package');

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: json({
      message: 'everything is awesome'
    }),
  };

  callback(null, response);
};