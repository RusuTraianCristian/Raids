const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.addTask = function(event, context, callback) {
    var params = {
        TableName: "Raids",
        Key: {
            "Id": event.id
        },
        Item: {
            "Id": event.id,
            "Task": event.task
        }
    };
    documentClient.update(params, function(err, data) {
        callback(err, data);
    });
};
