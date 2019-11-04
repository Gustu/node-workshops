const validator = require('validator');
const Tweet = require('../models/Tweet');
const { validate } = require('../common/Uuid');

const TweetService = ({ tweetRepository }) => {
  const writeTweet = async ({ writerId, message }) => {
    if (!validator.isLength(message, {
      min: 0,
      max: 255,
    })) {
      throw new Error('Message can contain only 255 chars');
    }

    validate(writerId);

    const tweet = Tweet({
      writerId,
      message,
    });

    return tweetRepository.createNew(tweet);
  };

  const deleteTweet = async (tweetId) => tweetRepository.delete(tweetId);

  const getTweets = async () => tweetRepository.findAll();

  return {
    writeTweet,
    deleteTweet,
    getTweets,
  };
};

module.exports = TweetService;
