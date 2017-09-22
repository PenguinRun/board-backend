var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = deleteSpeechClass = (deleteData) => {
    return new Promise((resolve, reject) => {
        //資料庫刪除資料的動作
        const deleteParams = {
            TableName: "speech_class",
            Key: {
                "create_date": deleteData.create_date,
            }
        };
        docClient.delete(deleteParams, (err, data) => {
            if (!err) {
                resolve("delete sucessful");
            } else {
                // console.log(err);
                reject("delete error");
            }
        });
    })
}

