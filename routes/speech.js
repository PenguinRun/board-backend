var express = require('express');
var router = express.Router();

const SpeechGetMethod = require('../controllers/speech/get_controller');
const SpeechModifyMethod = require('../controllers/speech/modify_controller')

speechGetMethod = new SpeechGetMethod();
speechModifyMethod = new SpeechModifyMethod();


/* GET home page. */
router.get('/', speechGetMethod.getSpeechData);

router.get('/data', speechGetMethod.getSpeechDataForFrontEnd);

router.post('/', speechModifyMethod.createSpeechData);

router.put('/', speechModifyMethod.updateSpeechData);

router.delete('/', speechModifyMethod.deleteSpeechData);

module.exports = router;
