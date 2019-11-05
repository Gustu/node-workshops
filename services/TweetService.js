const Tweet = require('../models/Tweet');

const TweetService = ({ tweetRepository, clock }) => {
  const writeTweet = async ({ writerId, message }) => {
    const tweet = Tweet({
      clock,
      writerId,
      message,
    });

    return tweetRepository.createNew(tweet);
  };

  const deleteTweet = async (tweetId) => {
    const tweet = await tweetRepository.findBy(tweetId);

    const canDelete = tweet.canDeleteAt(clock());

    if (!canDelete) {
      throw new Error('Cannot delete tweet');
    }

    return tweetRepository.delete(tweetId);
  };

  const getTweets = async () => tweetRepository.findAll();

  return {
    writeTweet,
    deleteTweet,
    getTweets,
  };
};

module.exports = TweetService;
