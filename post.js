const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.addTask = function(event, context, callback) {
    var params = {
        TableName: "Raids",
        Key: {
            "Id": event.id,
            "Task": event.id
        },
        UpdateExpression: "SET Bits = :bits",
        ExpressionAttributeValues: {
            ":bits": event.task
        },
        ReturnValues: "UPDATED_NEW"
    };
    documentClient.update(params, function(err, data) {
        callback(err, data);
    });
};
