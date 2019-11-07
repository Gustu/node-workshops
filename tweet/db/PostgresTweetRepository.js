const Tweet = require('../models/Tweet');

const mapTweet = (row) => Tweet({
  tweetId: row.tweet_id,
  writerId: row.writer_id,
  message: row.message,
  createdAt: row.created_at,
});

const PostgresTweetRepository = ({ db }) => ({
  async createNew(tweet) {
    const rows = await db('tweet')
      .insert({
        tweet_id: tweet.tweetId,
        writer_id: tweet.writerId,
        message: tweet.message,
      }, ['tweet_id']);
    if (!rows.length) {
      throw new Error('Could not create new tweet');
    }
    return { tweetId: rows[0].tweet_id };
  },
  async findByTweetId(tweetId) {
    const row = await db
      .select('*')
      .from('tweet')
      .where({ tweet_id: tweetId })
      .first();
    if (!row) {
      throw new Error('Could not find tweet by id');
    }
    return mapTweet(row);
  },
  async findByWriter(writerId) {
    const rows = await db
      .select('*')
      .from('tweet')
      .where({ writer_id: writerId });
    return rows.map(mapTweet);
  },
  async findAll() {
    const rows = await db
      .select('*')
      .from('tweet');
    return rows.map(mapTweet);
  },
  async delete(tweetId) {
    return db('tweet')
      .where({ tweet_id: tweetId })
      .delete();
  },
});

module.exports = PostgresTweetRepository;
