const { Router } = require('express');
const TweetsController = require('./tweet/controllers/TweetController');
const AccountController = require('./auth/AccountController');
const isLoggedIn = require('./common/middlewares/LoggedIn');

const ApiRoot = ({ tweetConfig, authConfig }) => {
  const router = Router();

  router.use('/tweets', isLoggedIn, TweetsController(tweetConfig));
  router.use('/auth', AccountController(authConfig));

  return router;
};

module.exports = ApiRoot;
