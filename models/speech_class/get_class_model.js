var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = getSpeechClass = () => {
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作
        const params = {
            TableName: "speech_class",
        };
        docClient.scan(params, (err, data) => {
            // console.log("data: " + data);
            if (!err) {
                resolve(data.Items);
            } else {
                // console.log(err);
                reject("get data error.");
            }
        });
    })
}

