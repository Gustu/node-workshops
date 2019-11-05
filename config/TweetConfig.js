const TweetService = require('../services/TweetService');
const InMemoryTweetRepository = require('../db/InMemoryTweetRepository');

const TweetConfig = ({ tweetDb, clock }) => {
  const tweetRepository = tweetDb || InMemoryTweetRepository();
  return ({
    tweetService: TweetService({ tweetRepository, clock }),
  });
};

module.exports = TweetConfig;
