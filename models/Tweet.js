const { differenceInSeconds } = require('date-fns');
const Uuid = require('../common/Uuid');

const MAX_MINUTES_FOR_DELETION_IN_SEC = 3 * 60;

const Tweet = ({
  tweetId = Uuid.generate(),
  writerId,
  message,
  clock,
  createdAt = clock(),
}) => ({
  tweetId,
  writerId,
  message,
  createdAt,
  canDeleteAt: (when) => differenceInSeconds(when, createdAt) <= MAX_MINUTES_FOR_DELETION_IN_SEC,
});

module.exports = Tweet;
