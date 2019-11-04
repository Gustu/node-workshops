const TweetService = require('../services/TweetService');
const InMemoryTweetRepository = require('../db/InMemoryTweetRepository');

const TweetConfig = ({ tweetDb }) => {
  const tweetRepository = tweetDb || InMemoryTweetRepository();
  return ({
    tweetService: TweetService({ tweetRepository }),
  });
};

module.exports = TweetConfig;
