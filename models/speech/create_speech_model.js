var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = createSpeech = (insertData) => {

    if (insertData.link === "") {
        insertData.link = "null"
    }

    return new Promise((resolve, reject) => {
        //資料庫新建資料的動作
        const params = {
            TableName: "speech",
        };
        const inputParams = {
            TableName: "speech",
            Item: {
                "id": insertData.id,
                "speaker": insertData.speaker,
                "title": insertData.title,
                "message": insertData.message,
                "speech_date": insertData.speech_date,
                "link": insertData.link,
                "class": insertData.class,
                "class_img": insertData.class_img,
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
        // docClient.scan(params, (err, data) => {
        //     // console.log("data: " + data);
        //     //若超過五筆就不給予新增
        //     if (data.Count >= 5) {
        //         reject("sorry, the data is more than 5.");
        //     } else {
        //         docClient.put(inputParams, (err, data) => {
        //             if (!err) {
        //                 resolve("create sucessful");
        //             } else {
        //                 // console.log(err);
        //                 reject("create error");
        //             }
        //         });
        //     }
        // });
    })
}

