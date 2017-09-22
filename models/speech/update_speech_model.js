var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = updateSpeech = (updateData) => {
    return new Promise((resolve, reject) => {
        //資料庫更新資料的動作
        const updateParams = {
            TableName: "speech",
            Item: {
                "speaker": updateData.speaker,
                "title": updateData.title,
                "message": updateData.message,
                "speech_date": updateData.speech_date,
                "link": updateData.link,
                "class": updateData.class,
                "class_img": updateData.class_img,
                "create_date": updateData.create_date,
                "update_date": updateData.update_date
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

