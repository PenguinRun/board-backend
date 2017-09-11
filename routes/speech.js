var express = require('express');
var router = express.Router();

const SpeechGetMethod = require('../controllers/get_controller');
const SpeechModifyMethod = require('../controllers/modify_controller')

speechGetMethod = new SpeechGetMethod();
speechModifyMethod = new SpeechModifyMethod();


/* GET home page. */
router.get('/', speechGetMethod.getSpeechData);

router.post('/create', speechModifyMethod.createSpeechData);

router.put('/update', speechModifyMethod.updateSpeechData);

router.delete('/delete', speechModifyMethod.deleteSpeechData);

module.exports = router;
