const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(
        `${process.cwd()}/views/index.pug`,
        {
            title: 'Home',
        }
    );
});

router.get('/sendMessage', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/send.pug`,
        {
            title: 'Send Message',
        }
    );
});

router.get('/replyToMessage', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/reply.pug`,
        {
            title: 'Reply To Message',
        }
    );
});

module.exports = router;