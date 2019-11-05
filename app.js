const express = require('express');
const bodyParser = require('body-parser');
const ApiRoot = require('./controllers');
const TweetConfig = require('./config/TweetConfig');
const clock = require('./common/Clock');

const config = TweetConfig({ clock });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', ApiRoot({ tweetConfig: config }));

app.use((req, res, next) => {
  res.status(404).send(`Not found ${req.path}`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(`Something gone wrong. ${err.message}`);
});

module.exports = app;
