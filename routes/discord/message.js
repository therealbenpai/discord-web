const express = require('express');
const router = express.Router();
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' })
const DiscordApi = require('discord-api-types/v10');

router.post('/send', (req, res) => {
    const { token, channelID, message } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.channelMessages(channelID), { body: { content: message } })
        .catch((err) => {
            console.error(err);
        });
    res.redirect('/sendMessage');
});

router.post('/reply', (req, res) => {
    const { token, channelID, message, replyToID } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.channelMessages(channelID), { body: { content: message, message_reference: { message_id: replyToID } } })
        .catch((err) => {
            console.error(err);
        });
    res.redirect('/replyToMessage');
});

router.post('/dm', (req, res) => {
    const { token, userID, message } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.userChannels(userID), { body: { recipient_id: userID } })
        .then((res) => {
            rest
                .setToken(token)
                .post(DiscordApi.Routes.channelMessages(res.id), { body: { content: message } })
        })
        .catch((err) => {
            console.error(err);
        });
    res.redirect('/dmUser');
});

module.exports = router;