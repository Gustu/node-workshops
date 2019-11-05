const { Router } = require('express');
const asyncWrapper = require('../middlewares/async');

const TweetController = ({ tweetService }) => {
  const router = Router();

  router.get('/', asyncWrapper(async (req, res) => {
    const tweets = await tweetService.getTweets();
    res.json(tweets);
  }));

  router.post('/', asyncWrapper(async (req, res) => {
    const { writerId, message } = req.body;
    const tweet = await tweetService.writeTweet({
      writerId,
      message,
    });
    res.json(tweet);
  }));

  router.delete('/:tweetId', asyncWrapper(async (req, res) => {
    const { tweetId } = req.params;
    await tweetService.deleteTweet(tweetId);
    res.status(200)
      .end();
  }));

  return router;
};

module.exports = TweetController;
