const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const routes = require('./src/routes');

app.set('view engine', 'pug');

app.use('/', routes);

https.createServer({
    key: fs.readFileSync(`${process.cwd()}/assets/certs/server.key`),
    cert: fs.readFileSync(`${process.cwd()}/assets/certs/server.cert`)
}, app).listen(443, () => {
    console.log('Listening on port 443');
});