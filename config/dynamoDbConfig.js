const AWS = require('aws-sdk');
require('dotenv').config(); 

AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: 'http://localhost:4566'
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDb;
