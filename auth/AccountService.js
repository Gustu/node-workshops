const bcrypt = require('bcrypt');
const Uuid = require('../common/Uuid');
const { generateToken } = require('../common/Jwt');

const AccountService = ({ accountRepository }) => {
  const login = async ({ email, password }) => {
    const account = await accountRepository.findByEmail(email);
    const passwordMatch = await bcrypt.compare(password, account.hash);
    if (passwordMatch) {
      return generateToken(account.account_id);
    }
    throw new Error('Invalid credentials');
  };

  const register = async ({ email, password }) => {
    const accountId = Uuid.generate();
    const hash = await bcrypt.hash(password, 10);
    return accountRepository.createAccount({
      accountId,
      email,
      hash,
    });
  };

  return {
    login,
    register,
  };
};

module.exports = AccountService;
