// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = updateSpeech = (updateData) => {
    return new Promise((resolve, reject) => {
        //資料庫更新資料的動作

        let result = {}
        db.query('UPDATE speech SET ? WHERE facebook_id = ? and create_date = ?', [updateData, updateData.facebook_id, updateData.create_date], (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '更新活動結果失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
                return
            }
            result.status = '更新活動結果成功'
            resolve(result)
        })
    })

        // DynamoDB
    //     const updateParams = {
    //         TableName: "speech",
    //         Item: {
    //             "id": updateData.speaker_id,
    //             "speaker": updateData.speaker,
    //             "speaker_img": updateData.speaker_img,
    //             "title": updateData.title,
    //             "message": updateData.message,
    //             "speech_date": updateData.speech_date,
    //             "link": updateData.link,
    //             "class": updateData.class,
    //             "class_img": updateData.class_img,
    //             "create_date": updateData.create_date,
    //             "update_date": updateData.update_date
    //         }
    //     };
    //     docClient.put(updateParams, (err, data) => {
    //         if (!err) {
    //             resolve("update sucessful");
    //         } else {
    //             console.log(err);
    //             reject("update error");
    //         }
    //     });
    // })
}

