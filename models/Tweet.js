const { differenceInSeconds } = require('date-fns');
const validator = require('validator');
const Uuid = require('../common/Uuid');

const MAX_MINUTES_FOR_DELETION_IN_SEC = 3 * 60;

const Tweet = ({
  tweetId = Uuid.generate(),
  writerId,
  message,
  clock,
  createdAt = clock(),
}) => {
  if (!validator.isLength(message, { min: 1, max: 255 })) {
    throw new TypeError(`Twitter does not match allowed range. Length ${message.length} of [1, 255]`);
  }

  if (!Uuid.isValid(writerId)) {
    throw new TypeError(`Writer id needs to be valid UUID ${writerId}`);
  }

  return {
    tweetId,
    writerId,
    message,
    createdAt,
    canDeleteAt: (when) => differenceInSeconds(when, createdAt) <= MAX_MINUTES_FOR_DELETION_IN_SEC,
  };
};

module.exports = Tweet;
