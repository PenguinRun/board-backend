var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = updateSpeechClass = (updateData) => {
    return new Promise((resolve, reject) => {
        //資料庫更新資料的動作
        const updateParams = {
            TableName: "speech_class",
            Item: {
                "name": updateData.name,
                "img_url": updateData.img_url,
                "create_date": updateData.create_date,
                "update_date": updateData.update_date,
            }
        };
        docClient.put(updateParams, (err, data) => {
            if (!err) {
                resolve("update sucessful");
            } else {
                // console.log(err);
                reject("update error");
            }
        });
    })
}

