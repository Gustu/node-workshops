const validator = require('validator');
const Tweet = require('../models/Tweet');
const Uuid = require('../../common/Uuid');

const MESSAGE_MIN_CHARS = 1;
const MESSAGE_MAX_CHARS = 255;

const InMemoryTweetRepository = (seed) => {
  const tweets = seed || {};

  const orderByCreatedAtDescending = (first, second) => second.createdAt - first.createdAt;

  return {
    async createNew(tweet) {
      if (!validator.isLength(tweet.message, { min: MESSAGE_MIN_CHARS, max: MESSAGE_MAX_CHARS })) {
        throw new TypeError(`Twitter does not match allowed range. Length ${tweet.message.length} of [${MESSAGE_MIN_CHARS}, ${MESSAGE_MAX_CHARS}]`);
      }

      if (!Uuid.isValid(tweet.writerId)) {
        throw new TypeError(`Writer id needs to be valid UUID ${tweet.writerId}`);
      }

      tweets[tweet.tweetId] = tweet;
      return tweet;
    },
    async findByTweetId(tweetId) {
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
