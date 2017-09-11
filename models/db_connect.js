var AWS = require('aws-sdk');
var config = require('../config/config');

AWS.config.update({
  accessKeyId: config.development.aws.id,
  secretAccessKey: config.development.aws.sk,
  region: config.development.aws.server
});

var dynamodb = new AWS.DynamoDB();

exports.dynamodb = dynamodb;

var docClient = new AWS.DynamoDB.DocumentClient();

exports.docClient=docClient;
