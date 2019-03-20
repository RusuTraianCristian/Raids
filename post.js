const AWS = require('aws-sdk');
const uuid = require(uuid);
const documentClient = new AWS.DynamoDB.DocumentClient();

export.addTask = function(event, context, callback) {
    var params = {
        Item: {
            "Id": uuid.v1(),
            "Task": event.task
        },
        TableName: process.env.TABLE_NAME
    };
    documentClient.put(params, function(err, data) {
        callback(err, data);
    });
}
