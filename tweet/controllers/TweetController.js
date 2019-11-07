const { Router } = require('express');
const asyncWrapper = require('../../common/middlewares/AsyncWrapper');

const TweetController = ({ tweetService }) => {
  const router = Router();

  router.get('/', asyncWrapper(async (req, res) => {
    const tweets = await tweetService.getTweets();
    res.json(tweets);
  }));

  router.post('/', asyncWrapper(async (req, res) => {
    const { message } = req.body;
    const tweet = await tweetService.writeTweet({
      writerId: req.user,
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
