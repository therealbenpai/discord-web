const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const routes = require('./src/routes');

app.set('view engine', 'pug');

app.use('/', routes);
app.use((err, req, res, next) => {
    switch (err.status) {
        case 401:
        case 403:
            res.status(err.status).render(
                `${process.cwd()}/views/errors/401.pug`,
                {
                    title: `401 - Unauthorized`,
                    path: req.path,
                    code: err.status
                }
            );
            break;
        case 404:
            next();
            break;
        case 405:
            // find the allowed methods for the path
            const { path } = req;
            const allowedMethods = app._router.stack
                .filter(r => r.route && r.route.path === path)
                .map(r => r.route.stack[0].method.toUpperCase())
                .join(', ');
            const methodUsed = req.method.toUpperCase();
            res.status(405).render(
                `${process.cwd()}/views/errors/405.pug`,
                {
                    title: '405 - Method Not Allowed',
                    path,
                    allowedMethods,
                    methodUsed
                }
            );
            break;
        default:
            res
                .status(501)
                .render(
                    `${process.cwd()}/views/errors/501.pug`,
                    {
                        title: `501 - Internal Server Error`,
                    }
                )
            break;
    }
}
);
app.use((req, res, next) => {
    res.status(404).render(
        `${process.cwd()}/views/errors/404.pug`,
        {
            title: '404 - Page Not Found',
            path: req.path
        }
    );
})

https.createServer({
    key: fs.readFileSync(`${process.cwd()}/assets/certs/server.key`),
    cert: fs.readFileSync(`${process.cwd()}/assets/certs/server.cert`)
}, app).listen(443, () => {
    console.log('Listening on port 443');
});