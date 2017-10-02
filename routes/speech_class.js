var express = require('express');
var router = express.Router();

const SpeechClassGetMethod = require('../controllers/speech_class/get_controller');
const SpeechClassModifyMethod = require('../controllers/speech_class/modify_controller');

speechClassGetMethod = new SpeechClassGetMethod();
speechClassModifyMethod = new SpeechClassModifyMethod();

//演講分類管理-CRUD

/* GET home page. */
router.get('/', speechClassGetMethod.getSpeechClassData);

router.post('/', speechClassModifyMethod.createSpeechClassData);

router.put('/', speechClassModifyMethod.updateSpeechClassData);

router.delete('/', speechClassModifyMethod.deleteSpeechClassData);

module.exports = router;
