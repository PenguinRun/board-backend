// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = createSpeech = (insertData) => {

    if (insertData.link === "") {
        insertData.link = "null"
    }

    return new Promise((resolve, reject) => {

        let result = {}
        db.query('INSERT INTO speech SET ?', insertData, (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '建立活動結果失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
            }
            result.status = '建立活動結果成功'
            resolve(result)
        })

        // DynamoDB
        //資料庫新建資料的動作
        // const params = {
        //     TableName: "speech",
        // };
        // const inputParams = {
        //     TableName: "speech",
        //     Item: {
        //         "id": insertData.id,
        //         "speaker": insertData.speaker,
        //         "speaker_img": insertData.speaker_img,
        //         "title": insertData.title,
        //         "message": insertData.message,
        //         "speech_date": insertData.speech_date,
        //         "link": insertData.link,
        //         "class": insertData.class,
        //         "class_img": insertData.class_img,
        //         "create_date": insertData.create_date,
        //         "update_date": insertData.update_date, 
        //     }
        // };
        // docClient.put(inputParams, (err, data) => {
        //     if (!err) {
        //         resolve("create sucessful");
        //     } else {
        //         // console.log(err);
        //         reject("create error");
        //     }
        // });
    })
}

