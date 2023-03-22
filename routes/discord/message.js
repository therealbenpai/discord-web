const express = require('express');
const router = express.Router();
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' })
const DiscordApi = require('discord-api-types/v10');
const errorHandling = require('../../functions/discordErrorCode');

router.post('/send', (req, res) => {
    const { token, channelID, message } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.channelMessages(channelID), { body: { content: message } })
        .then(_ => res.redirect('/sendMessage'), err => errorHandling(err, res, '/sendMessage'))
});

router.post('/reply', (req, res) => {
    const { token, channelID, message, replyToID } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.channelMessages(channelID), { body: { content: message, message_reference: { message_id: replyToID } } })
        .then(_ => res.redirect('/replyToMessage'), err => errorHandling(err, res, '/replyToMessage'))
});

router.post('/dm', (req, res) => {
    const { token, userID, message } = req.body;
    rest
        .setToken(token)
        .post(DiscordApi.Routes.userChannels(userID), { body: { recipient_id: userID } })
        .catch((err) => errorHandling(err, res))
        .then((res) => {
            rest
                .setToken(token)
                .post(DiscordApi.Routes.channelMessages(res.id), { body: { content: message } })
        })
        .then(_ => res.redirect('/dmUser'), err => errorHandling(err, res, '/dmUser'));
    res.redirect('/dmUser');
});

module.exports = router;