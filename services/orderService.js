const { v4: uuidv4 } = require('uuid');
const dynamoDb = require('../config/dynamoDbConfig');

exports.createOrder = async (orderData) => {
  const params = {
    TableName: process.env.ORDERS_TABLE,
    Item: {
      OrderID: uuidv4(),
      ...orderData,
      createdAt: new Date().toISOString()
    }
  };

  console.log("esta", params)
  await dynamoDb.put(params).promise();
  return params.Item;
};


exports.getAllOrders = async () => {
  const params = {
    TableName: process.env.ORDERS_TABLE
  };

  const result = await dynamoDb.scan(params).promise();
  return result.Items || [];
};
