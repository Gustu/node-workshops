const Tweet = require('../models/Tweet');

const TweetService = ({ tweetRepository, clock }) => {
  const writeTweet = async ({ writerId, message }) => {
    const tweet = Tweet({
      writerId,
      message,
    });

    return tweetRepository.createNew(tweet);
  };

  const deleteTweet = async (tweetId) => {
    const tweet = await tweetRepository.findByTweetId(tweetId);

    const enoughTimeForDelete = tweet.enoughTimeForDelete(clock());

    if (!enoughTimeForDelete) {
      throw new Error('Cannot delete tweet. Time elapsed.');
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
