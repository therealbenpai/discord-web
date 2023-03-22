const express = require('express');
const router = express.Router();
const page = require('../routes/main');
const api = require('../routes/api');
const cdn = require('../routes/cdn');

router.use('/', page);
router.use('/api', api);
router.use('/cdn', cdn);

module.exports = router;