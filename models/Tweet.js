const { differenceInSeconds } = require('date-fns');
const Uuid = require('../common/Uuid');

const MAX_MINUTES_FOR_DELETION_IN_SEC = 3 * 60;

const Tweet = ({
  tweetId = Uuid.generate(),
  writerId,
  message,
  createdAt,
}) => ({
  tweetId,
  writerId,
  message,
  createdAt,
  enoughTimeForDelete: (when) => differenceInSeconds(when, createdAt) <= MAX_MINUTES_FOR_DELETION_IN_SEC,
});

module.exports = Tweet;
