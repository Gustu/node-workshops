const assert = require('assert');
const { parseISO } = require('date-fns');
const InMemoryTweetRepository = require('../../db/InMemoryTweetRepository');
const TweetService = require('../TweetService');
const UUID = require('../../common/Uuid');

describe('TweetService', () => {
  const tweetRepository = InMemoryTweetRepository();

  function tweetMatchesRequestData(tweet, writerId, message) {
    assert(tweet !== null);
    assert(tweet.tweetId !== null);
    assert(tweet.writerId === writerId);
    assert(tweet.message === message);
  }

  it('should write tweet', async () => {
    // given
    const writerId = UUID.generate();
    const tweetService = TweetService({ tweetRepository, clock: () => new Date() });
    const message = '12313';

    // when
    const tweet = await tweetService.writeTweet({
      writerId,
      message,
    });

    // then
    tweetMatchesRequestData(tweet, writerId, message);
    const tweets = await tweetRepository.findAll();
    assert.equal(tweets.length, 1);
  });

  it('should not write tweet when message exceeds 255 chars', async () => {
    // given
    const writerId = UUID.generate();
    const tweetService = TweetService({ tweetRepository, clock: () => new Date() });
    const message = [...Array(256 + 1)].join('1');

    // when
    const promise = tweetService.writeTweet({
      writerId,
      message,
    });

    // then
    await assert.rejects(promise);
  });

  it('should not write tweet when author is missing', async () => {
    // given
    const tweetService = TweetService({ tweetRepository, clock: () => new Date() });
    const message = 'asdasdaswe';

    // when
    const promise = tweetService.writeTweet({ message });

    // then
    await assert.rejects(promise);
  });

  it('should not delete tweet after 3 minutes', async () => {
    // given
    const now = () => parseISO('2019-01-20 12:00:00');
    const nowPlus3Minutes = () => parseISO('2019-01-20 12:03:01');
    const tweetRepositoryWithSeed = InMemoryTweetRepository();
    const tweetService = TweetService({
      tweetRepository: tweetRepositoryWithSeed,
      clock: now,
    });
    const tweet = await tweetService.writeTweet({
      writerId: UUID.generate(),
      message: 'asd',
    });

    // when
    const tweetServiceAfter = TweetService({
      tweetRepository: tweetRepositoryWithSeed,
      clock: nowPlus3Minutes,
    });
    const deleteTweet = tweetServiceAfter.deleteTweet(tweet.tweetId);

    // then
    await assert.rejects(deleteTweet, {
      name: 'Error',
      message: 'Cannot delete tweet',
    });
  });

  it('should delete tweet after 2 minutes and 59 seconds', async () => {
    // given
    const now = () => parseISO('2019-01-20 12:00:00');
    const nowPlus3Minutes = () => parseISO('2019-01-20 12:02:59');
    const tweetRepositoryWithSeed = InMemoryTweetRepository();
    const tweetService = TweetService({
      tweetRepository: tweetRepositoryWithSeed,
      clock: now,
    });
    const tweet = await tweetService.writeTweet({
      writerId: UUID.generate(),
      message: 'asd',
    });

    // when
    const tweetServiceAfter = TweetService({
      tweetRepository: tweetRepositoryWithSeed,
      clock: nowPlus3Minutes,
    });
    await tweetServiceAfter.deleteTweet(tweet.tweetId);

    // then
    const tweetAfter = tweetRepository.findByTweetId(tweet.tweetId);
    await assert.rejects(tweetAfter);
  });

});
