const getSpeech = require('../models/get-speech-model');


//GET Method
module.exports = class SpeechGetMethod {
    //讀取speech table資料
    getSpeechData(req, res, next) {
        let reqOrigin = req.headers.origin;
        // console.log("reqOrigin: " + reqOrigin);

        if (reqOrigin === undefined) {
            res.json({
                err: 'error request.'
            })
        } else {
            if (checkOriginAllowed(reqOrigin, allowOrigin)) {
            } else {
                res.json({
                    err: 'error request.'
                })
            }e
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
}

const checkOriginAllowed = (origin, allowedOrigin) => {
  if (_.isArray(allowedOrigin)) {
      for (let i = 0; i < allowedOrigin.length; i++) {
          if (checkOriginAllowed(origin, allowedOrigin[i])) {
              return true;
          }
      }
      return false;
  } else if (_.isString(allowedOrigin)) {
      return origin === allowedOrigin;
  } else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
  } else {
      return !!allowedOrigin;
  }
}

const allowOrigin = [
  'devche.com'
]