const config = require('../../config/config');

const getSpeechClass = require('../../models/speech_class/get_class_model');

const checkToken = require('../../service/verify');
const CheckSomething = require('../../service/check');

//GET Method
module.exports = class SpeechClassGetMethod {
    //讀取speech class table資料
    getSpeechClassData(req, res, next) {
        const token = req.headers['x-access-token'];
        // console.log("token: " + token);
        const checkSomething = new CheckSomething();
        
        //確定token是否輸入
        if (checkSomething.checkNull(token) === false) {
            res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
            // res.redirect(config.development.testURL + '/#/');
            return;
        }
        //認證token
        checkToken(token).then((tokenResult) => {
            //若失敗
            if (tokenResult === false) {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
                // res.redirect(config.development.testURL + '/#/');
                return;
            } else {
                //若成功
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
        }, (err) => {
            res.json({
                err: err
            })
        })
    }
}