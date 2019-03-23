const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.getAllTasks = function(event, context, callback) {
    const params = {
        TableName: process.env.TABLE_NAME
    };
    documentClient.scan(params, function(err, data) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, data.Items);
        }
    });
}
