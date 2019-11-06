const TweetService = require('../services/TweetService');
const AccountService = require('../services/AccountService');
const InMemoryTweetRepository = require('../db/InMemoryTweetRepository');
const PostgresTweetRepository = require('../db/PostgresTweetRepository');
const AccountRepository = require('../db/PostgresAccountRepository');

const TweetConfig = ({ tweetDb, clock }) => {
  const tweetRepository = tweetDb
    ? PostgresTweetRepository({ db: tweetDb })
    : InMemoryTweetRepository();
  return ({
    tweetService: TweetService({
      tweetRepository,
      clock,
    }),
    accountService: AccountService({ accountRepository: AccountRepository({ db: tweetDb }) }),
  });
};

module.exports = TweetConfig;
