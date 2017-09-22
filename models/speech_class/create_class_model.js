var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = createSpeechClass = (insertData) => {
    return new Promise((resolve, reject) => {
        //資料庫新建資料的動作
        const inputParams = {
            TableName: "speech_class",
            Item: {
                "name": insertData.name,
                "img_url": insertData.img_url,
                "create_date": insertData.create_date,
                "update_date": insertData.update_date, 
            }
        };
        docClient.put(inputParams, (err, data) => {
            if (!err) {
                resolve("create sucessful");
            } else {
                // console.log(err);
                reject("create error");
            }
        });
    })
}

