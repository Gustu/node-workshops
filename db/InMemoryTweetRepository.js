const Tweet = require('../models/Tweet');

const InMemoryTweetRepository = (seed) => {
  const tweets = seed || {};

  const orderByCreatedAtDescending = (first, second) => second.createdAt - first.createdAt;

  return {
    async createNew(tweet) {
      tweets[tweet.tweetId] = tweet;
      return tweet;
    },
    async findBy(tweetId) {
      if (!tweets[tweetId]) {
        throw new Error('Tweet not found');
      }
      return Tweet(tweets[tweetId]) || null;
    },
    async findByWriter(writerId) {
      return Object.values(tweets)
        .find((tweet) => tweet.writerId === writerId)
        .map((tweet) => Tweet(tweet))
        .sort(orderByCreatedAtDescending);
    },
    async findAll() {
      return Object.values(tweets)
        .map((tweet) => Tweet(tweet))
        .sort(orderByCreatedAtDescending);
    },
    async delete(tweetId) {
      delete tweets[tweetId];
    },
  };
};

module.exports = InMemoryTweetRepository;
