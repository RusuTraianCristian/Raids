const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.postRaids = async function(event, context, callback) {
    var params = {
        TableName: "Raids",
        Key: {
            "Id": event.id,
            "Task": event.id
        },
        UpdateExpression: "SET required = :required, target = :target",
        ExpressionAttributeValues: {
            ":required": event.required,
            ":target": event.target
        },
        ReturnValues: "UPDATED_NEW"
    };
    documentClient.update(params, function(err, data) {
        callback(err, data);
    });

    const secret = new Buffer.from('MBnRcsINvycQCgm8K7rB4OV16eA9z3IeGcPthVshAwQ=', 'base64');

    const payload = {
        "exp": Math.floor(new Date().getTime() / 1000) + 60,
        "user_id": "47013474",
        "role": "external"
    };

    const signedJwt = jwt.sign(payload, secret);

    const config = {
        method: 'put',
        url: `https://api.twitch.tv/extensions/ptm1pmj69bfuceli46nae7bfhi7q8n/1.0.0/required_configuration?channel_id=${event.id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + signedJwt,
            'Client-Id': "ptm1pmj69bfuceli46nae7bfhi7q8n"
        },
        data: '{"required_configuration": "isConfigured"}'
    }
   const response = await axios(config).then(res => res.status);
   return response;
};
