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

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
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
