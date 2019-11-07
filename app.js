const express = require('express');
const bodyParser = require('body-parser');
const ApiRoot = require('./index');
const TweetConfig = require('./tweet/TweetConfig');
const AuthConfig = require('./auth/AuthConfig');
const clock = require('./common/Clock');
const db = require('./config/DatabaseConfig');
const jwtAuthentication = require('./common/middlewares/JwtAuthentication');

const tweetConfig = TweetConfig({ clock, tweetDb: db });
const authConfig = AuthConfig({ authDb: db });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwtAuthentication);

app.use('/api', ApiRoot({ tweetConfig, authConfig }));

app.use((req, res, next) => {
  res.status(404).send(`Not found ${req.path}`);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(`Something gone wrong. ${err.message}`);
});

module.exports = app;
