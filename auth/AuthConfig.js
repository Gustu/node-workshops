const AccountService = require('../auth/AccountService');
const AccountRepository = require('../auth/PostgresAccountRepository');

const AuthConfig = ({ authDb }) => ({
  accountService: AccountService({ accountRepository: AccountRepository({ db: authDb }) }),
});

module.exports = AuthConfig;
