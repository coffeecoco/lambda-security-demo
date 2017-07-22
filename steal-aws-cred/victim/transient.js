'use strict';

const parse = require('do-not-download-this-package-neither');

module.exports.handler = (event, context, callback) => {
  let _ = parse(event.body);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'everything is awesome'
    }),
  };

  callback(null, response);
};