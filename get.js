const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.getAllTasks = function(event, context, callback) {
    const params = {
        TableName: "Raids",
        Key: {
            "Id": event.Id,
            "Task": event.Task
        }
    };
    documentClient.get(params, function(err, data) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, data.Item);
        }
    });
}
