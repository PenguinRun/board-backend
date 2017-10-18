var express = require('express');
var router = express.Router();

var GetMember = require('../controllers/member/get_controller');
var ModifyMember = require('../controllers/member/modify_controller');
var Passport = require('../controllers/member/passport_controller');

var getMember = new GetMember();
var modifyMember = new ModifyMember();
var passport = new Passport();

//取得全部member資料
router.get('/all', getMember.getAllMemberData);

//取得單一member資料
router.get('/', getMember.getOneMemberData);

//登入轉址
router.get('/login/redirect', modifyMember.redirectMemberLogin);

//進行facebook使用權限確認-登入button觸發
router.get('/login/facebook', passport.authenticate());

//進行認證確認
router.get('/login/facebook/return', passport.checkLogin());

//登出
router.post('/logout', modifyMember.loginOutAction);

module.exports = router;
