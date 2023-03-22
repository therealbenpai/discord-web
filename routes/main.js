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

router.get('/dmUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/dm.pug`,
        {
            title: 'Direct Message User',
        }
    );
});

// make routes for muting, banning, and kicking

router.get('/muteUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/mute.pug`,
        {
            title: 'Mute User',
        }
    );
});

router.get('/banUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/ban.pug`,
        {
            title: 'Ban User',
        }
    );
});

router.get('/kickUser', (req, res) => {
    res.render(
        `${process.cwd()}/views/modes/kick.pug`,
        {
            title: 'Kick User',
        }
    );
});

module.exports = router;