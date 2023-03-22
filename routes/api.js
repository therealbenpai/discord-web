const express = require('express');
const router = express.Router();
const discord = require('./discord/main');

router.use('/discord', discord);

module.exports = router;