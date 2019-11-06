const PostgresTweetRepository = ({ db }) => ({
  async findByAccountId(accountId) {
    return db
      .select('*')
      .from('account')
      .where({ account_id: accountId })
      .first();
  },
  async createAccount({ email, hash }) {
    return db('account')
      .insert({
        email,
        hash,
      });
  },
});

module.exports = PostgresTweetRepository;
