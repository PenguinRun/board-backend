var express = require('express');
var router = express.Router();

const SpeechGetMethod = require('../controllers/get_controller');
const SpeechModifyMethod = require('../controllers/modify_controller')

speechGetMethod = new SpeechGetMethod();
speechModifyMethod = new SpeechModifyMethod();


/* GET home page. */
router.get('/', speechGetMethod.getSpeechData);

router.post('/', speechModifyMethod.createSpeechData);

router.put('/', speechModifyMethod.updateSpeechData);

router.delete('/', speechModifyMethod.deleteSpeechData);

//cors
router.options('/', (req, res, next) => {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, x-access-token')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next();
});

module.exports = router;
