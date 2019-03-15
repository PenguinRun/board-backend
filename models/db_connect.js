// DataBase
const config = require('../config/config');
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: config.development.mysql.host,
  user: config.development.mysql.user,
  password: config.development.mysql.password,
  database: config.development.mysql.database,
  port: config.development.mysql.port
});

connection.connect(err => {
  if (err) {
    console.log('connecting error');
  } else {
    console.log('connecting success');
  }
});

module.exports = connection;

// AWS DynamoDB
// var AWS = require('aws-sdk');
// var config = require('../config/config');

// AWS.config.update({
//   accessKeyId: config.development.aws.id,
//   secretAccessKey: config.development.aws.sk,
//   region: config.development.aws.server
// });

// var dynamodb = new AWS.DynamoDB();

// exports.dynamodb = dynamodb;

// var docClient = new AWS.DynamoDB.DocumentClient();

// exports.docClient=docClient;
