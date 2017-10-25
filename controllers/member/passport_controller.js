const passport = require('../../config/passport');
const config = require('../../config/config');

module.exports = class Passport {
    //speech_member部份
    //進行facebook使用權限確認
    authenticate(req, res, next) {
        return passport.authenticate('facebook', {
            authType: 'rerequest',
            scope: ['public_profile']
        })
    }
    //進行認證確認
    checkLogin(req, res, next) {
        return passport.authenticate('facebook', {
            successRedirect: '/api/speechmember/login/redirect',
            // failureRedirect: config.development.testURL + '/#/', //認證失敗的導入
            failureRedirect: config.production.URL + '/#/', //認證失敗的導入
            
        })
    }
}
