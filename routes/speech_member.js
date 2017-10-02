var express = require('express');
var router = express.Router();

var GetMember = require('../controllers/member/get_controller');
var ModifyMember = require('../controllers/member/modify_controller');
var Passport = require('../controllers/member/passport_controller');

var getMember = new GetMember();
var modifyMember = new ModifyMember();
var passport = new Passport();

//取得全部member資料..?
// router.get('/', getMember.getAllmember);

//取得單一member資料
router.get('/', getMember.getTodoListLogin);

//轉址
router.get('/login/redirect', modifyMember.redirectMemberLogin);

//進行facebook使用權限確認-登入button觸發
router.get('/login/facebook', passport.authenticate());

//進行認證確認
router.get('/login/facebook/return', passport.checkLogin());

module.exports = router;
