const { Router } = require('express');

const TweetController = ({ tweetService }) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const tweets = await tweetService.getTweets();
    res.json(tweets);
  });

  return router;
};

module.exports = TweetController;
