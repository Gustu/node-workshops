const express = require('express');
const bodyParser = require('body-parser');
const ApiRoot = require('./controllers');
const TweetConfig = require('./config/TweetConfig');

const config = TweetConfig({});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', ApiRoot({ tweetConfig: config }));

app.use((err, req, res, next) => {
  console.log(err);
  res.send(`Something gone wrong. ${err.message}`);
});

module.exports = app;
