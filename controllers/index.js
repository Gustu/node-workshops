const { Router } = require('express');
const TweetsController = require('./TweetController');
const AccountController = require('./AccountController');

const ApiRoot = ({ tweetConfig }) => {
  const router = Router();

  router.use('/tweets', TweetsController(tweetConfig));
  router.use('/auth', AccountController(tweetConfig));

  return router;
};

module.exports = ApiRoot;
