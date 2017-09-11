const getSpeech = require('../models/get-speech-model');


//GET Method
module.exports = class SpeechGetMethod {
    //讀取speech table資料
    getSpeechData(req, res) {
        getSpeech().then((result) => {
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
