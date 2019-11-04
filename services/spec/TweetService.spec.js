const assert = require('assert');
const InMemoryTweetRepository = require('../../db/InMemoryTweetRepository');
const TweetService = require('../TweetService');
const UUID = require('../../common/Uuid');

const TWEET_ID = 'b6dd72a0-d79b-4777-b154-cfe6b42c2b42';

const TWEETS = {
  [TWEET_ID]: {
    tweetId: TWEET_ID,
    writerId: '671b1f15-0178-4122-bc1e-c13f7f61d814',
    message: 'asdsad',
    createdAt: new Date(),
  },
};

describe('TweetService', () => {
  const tweetRepository = InMemoryTweetRepository();

  function tweetMatchesRequestData(tweet, writerId, message) {
    assert(tweet !== null);
    assert(tweet.tweetId !== null);
    assert(tweet.writerId === writerId);
    assert(tweet.message === message);
  }

  it('should write tweet', async () => {
    // when
    const writerId = UUID.generate();
    const tweetService = TweetService({ tweetRepository });
    const message = '12313';

    // given

    const tweet = await tweetService.writeTweet({ writerId, message });

    // then
    tweetMatchesRequestData(tweet, writerId, message);
    const tweets = await tweetRepository.findAll();
    assert.equal(tweets.length, 1);
  });

  it('should not write tweet when message exceeds 255 chars', async () => {
    // when
    const writerId = UUID.generate();
    const tweetService = TweetService({ tweetRepository });
    const message = [...Array(256 + 1)].join('1');

    // given

    const promise = tweetService.writeTweet({ writerId, message });

    // then
    await assert.rejects(promise);
  });

  it('should not write tweet when author is missing', async () => {
    // when
    const tweetService = TweetService({ tweetRepository });
    const message = [...Array(256 + 1)].join('1');

    // given

    const promise = tweetService.writeTweet({ message });

    // then
    await assert.rejects(promise);
  });

  it('should delete tweet', async () => {
    // when
    const tweetRepositoryWithSeed = InMemoryTweetRepository(TWEETS);
    const tweetService = TweetService({ tweetRepository: tweetRepositoryWithSeed });
    const tweetBefore = await tweetRepositoryWithSeed.findBy(TWEET_ID);

    // given
    await tweetService.deleteTweet(TWEET_ID);

    // then
    const tweetAfter = await tweetRepositoryWithSeed.findBy(TWEET_ID);
    assert(tweetBefore !== null);
    assert(tweetAfter === null);
  });


});
