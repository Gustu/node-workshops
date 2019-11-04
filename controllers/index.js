const { Router } = require('express');
const TweetsController = require('./TweetController');

const ApiRoot = ({ tweetConfig }) => {
  const router = Router();

  router.use('/tweets', TweetsController(tweetConfig));

  return router;
};

module.exports = ApiRoot;
