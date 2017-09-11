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
                res.setHeader("Access-Control-Allow-Origin", reqOrigin);
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token')
                next();
            } else {
                res.json({
                    err: 'error request.'
                })
            }
            getSpeech().then((result) => {
                // res.setHeader('Access-Control-Allow-Origin', '*');
                // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
                // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token')
                // res.setHeader('Access-Control-Allow-Credentials', true)
                // Add headers
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