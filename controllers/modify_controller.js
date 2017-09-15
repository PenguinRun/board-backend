const createSpeech = require('../models/create-speech-model');
const updateSpeech = require('../models/update-speech-model');
const deleteSpeech = require('../models/delete-speech-model');

//another Method.(just like POST, PUT and DELETE)
module.exports = class SpeechModifyMethod {
    //建立speech table資料
    createSpeechData(req, res) {
        const insertData = {
            "speaker": req.body.speaker,
            "title": req.body.title,
            "message": req.body.message,
            "speech_date": req.body.speech_date,
            "create_date": onTime(),
        }
        createSpeech(insertData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            res.json({
                err: err
            })
        } )
    }
    //修改speech table資料
    updateSpeechData(req, res) {
        const updateData = {
            "speaker": req.body.speaker,
            "title": req.body.title,
            "message": req.body.message,
            "speech_date": req.body.speech_date,
            "create_date": req.body.create_date,
        }
        updateSpeech(updateData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            err: err
        })
    }
    //刪除speech table資料
    deleteSpeechData(req, res) {
        const deleteData = {
            "create_date": req.body.create_date,
        }
        deleteSpeech(deleteData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            res.json({
                err: err
            })
        })
    }
}
//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}