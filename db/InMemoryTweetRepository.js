const InMemoryTweetRepository = (tweets = {}) => {
    const api = {
        async createNew(tweet) {
            return api.update(tweet);
        },
        async update(tweet) {
            tweets[tweet.id] = tweet;
            return tweet;
        },
        async findBy(tweetId) {
            return tweets[tweetId];
        },
        async findByWriter(writerId) {
            return Object.values(tweets).find(tweet => tweet.writerId === writerId);
        },
        async findAll() {
            return Object.values(tweets);
        },
        async delete(tweetId) {
            delete tweets[tweetId]
        }
    };
    return api;
};

module.exports = InMemoryTweetRepository;
