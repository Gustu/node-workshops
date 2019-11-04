const express = require('express');
const ApiRoot = require('./controllers');
const TweetConfig = require('./config/TweetConfig');

const config = TweetConfig({});

const app = express();

app.use('/api', ApiRoot({ tweetConfig: config }));

module.exports = app;
