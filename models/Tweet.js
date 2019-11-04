const Uuid = require('../common/Uuid');

const Tweet = ({
  tweetId = Uuid.generate(),
  writerId,
  message,
  createdAt = new Date(),
}) => ({
  tweetId,
  writerId,
  message,
  createdAt,
});

module.exports = Tweet;
