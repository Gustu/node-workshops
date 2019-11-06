const assert = require('assert');
const PostgresTweetRepository = require('../PostgresTweetRepository');
const db = require('../../config/DatabaseConfig');
const UUID = require('../../common/Uuid');

describe('PostgresTweetRepository integration test', () => {
  beforeEach(async () => {
    await db('tweet')
      .delete();
  });

  it('should fetch 0 tweets without seed', async () => {
    // given
    const tweetRepository = PostgresTweetRepository({ db });
    // when
    const tweets = await tweetRepository.findAll();
    // then
    assert.equal(tweets.length, 0);
  });

  it('should fetch 2 tweets', async () => {
    // given
    const tweetRepository = PostgresTweetRepository({ db });
    const tweet = () => ({
      tweetId: UUID.generate(),
      writerId: UUID.generate(),
      message: 'Tweet',
    });
    await tweetRepository.createNew(tweet());
    await tweetRepository.createNew(tweet());
    // when
    const tweets = await tweetRepository.findAll();
    // then
    assert.equal(tweets.length, 2);
  });

  it('should delete tweet', async () => {
    // given
    const tweetRepository = PostgresTweetRepository({ db });
    const tweet = ({
      tweetId: UUID.generate(),
      writerId: UUID.generate(),
      message: 'Tweet',
    });
    await tweetRepository.createNew(tweet);
    const tweetsBefore = await tweetRepository.findAll();
    // when
    await tweetRepository.delete(tweet.tweetId);
    // then
    const tweetsAfter = await tweetRepository.findAll();
    assert.equal(tweetsBefore.length, 1);
    assert.equal(tweetsAfter.length, 0);
  });
});
