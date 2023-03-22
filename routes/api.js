const express = require('express');
const router = express.Router();
const { REST } = require('@discordjs/rest');
const DiscordApi = require('discord-api-types/v10');
const BodyParser = require('body-parser');

router.use(BodyParser.urlencoded({ extended: true }));

router.post('/sendMessage', (req, res) => {
    console.log(req.body);
    const {
        token,
        serverId,
        channelId,
        message
    } = req.body;

    const rest = new REST({ version: '9' }).setToken(token)

    rest.post(
        DiscordApi.Routes.channelMessages(channelId),
        { body: { content: message } }
    ).then(() => {
        // console.log('Message sent!');
    }).catch((err) => {
        console.error(err);
    });
    res.redirect('/');
});

module.exports = router;