const getSpeechClass = require('../../models/speech_class/get_class_model');


//GET Method
module.exports = class SpeechClassGetMethod {
    //讀取speech class table資料
    getSpeechClassData(req, res, next) {
        getSpeechClass().then((result) => {
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