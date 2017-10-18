var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = loginOutToken = (id) =>{
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作
        const params = {
            TableName: "speech_member",
            Key: { 'id': id },
            ExpressionAttributeNames:{
                '#t': 'token'
            },
            UpdateExpression: "SET #t = :token",
            ExpressionAttributeValues: {
                ":token": "null"
            }
        };
        docClient.update(params, (err, data) => {
            if (!err) {
                // console.log("items: " + JSON.stringify(data));
                resolve("delete token successful.");
            } else {
                // console.log("err: " + err);
                reject("get data error.");
            }
        });
    })
}