var Dynamodb = require('./db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = createSpeech = (insertData) => {
    return new Promise((resolve, reject) => {
        //資料庫新建資料的動作
        const params = {
            TableName: "speech",
        };
        const inputParams = {
            TableName: "speech",
            Item: {
                "speaker": insertData.speaker,
                "title": insertData.title,
                "message": insertData.message,
                "speech_date": insertData.speech_date, 
                "create_date": insertData.create_date,
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

