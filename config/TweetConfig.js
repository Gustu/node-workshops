const TweetService = require('../services/TweetService');
const InMemoryTweetRepository = require('../db/InMemoryTweetRepository');
const PostgresTweetRepository = require('../db/PostgresTweetRepository');

const TweetConfig = ({ tweetDb, clock }) => {
  const tweetRepository = tweetDb
    ? PostgresTweetRepository({ db: tweetDb })
    : InMemoryTweetRepository();
  return ({
    tweetService: TweetService({
      tweetRepository,
      clock,
    }),
  });
};

module.exports = TweetConfig;
