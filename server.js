const express = require('express');
const router = require('./router');
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
    "Too many requests from this IP, please try again after 15 minutes"
});

app.use('*', limiter);

app.use('/', router);

const port = process.env.port || 2000;

app.listen(port, () => console.log('APP LISTENING ON PORT: ' + port))