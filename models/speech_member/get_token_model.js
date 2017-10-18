var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = getToken = (id) => {
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作
        const params = {
            TableName: "speech_member",
            Key: {'id': id}
        };
        docClient.get(params, (err, data) => {
            if(!err) {
                // console.log("items: " + JSON.stringify(data));
                resolve(data.Item.token);
            } else {
                // console.log("err: " + err);
                reject("get data error.");
            }
        });
    }) 
}