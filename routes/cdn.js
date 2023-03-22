const express = require('express');
const router = express.Router();

router.get('/css/:file', (req, res) => {
    res.sendFile(`${process.cwd()}/assets/css/${req.params.file}`);
});

module.exports = router;