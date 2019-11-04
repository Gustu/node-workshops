const InMemoryTweetRepository = (seed) => {
  const tweets = seed || {};

  const orderByCreatedAt = (first, second) => first.createdAt - second.createdAt;

  const api = {
    async createNew(tweet) {
      tweets[tweet.tweetId] = tweet;
      return tweet;
    },
    async findBy(tweetId) {
      return tweets[tweetId] || null;
    },
    async findByWriter(writerId) {
      return Object.values(tweets)
        .find((tweet) => tweet.writerId === writerId)
        .sort(orderByCreatedAt);
    },
    async findAll() {
      return Object.values(tweets).sort(orderByCreatedAt);
    },
    async delete(tweetId) {
      delete tweets[tweetId];
    },
  };
  return api;
};

module.exports = InMemoryTweetRepository;
