const { Router } = require('express');
const TweetsController = require('./TweetController');
const AccountController = require('./AccountController');
const isLoggedIn = require('../middlewares/LoggedIn');

const ApiRoot = ({ tweetConfig }) => {
  const router = Router();

  router.use('/tweets', isLoggedIn, TweetsController(tweetConfig));
  router.use('/auth', AccountController(tweetConfig));

  return router;
};

module.exports = ApiRoot;
