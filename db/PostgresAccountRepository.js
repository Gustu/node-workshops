const PostgresAccountRepository = ({ db }) => ({
  async findByEmail(email) {
    return db
      .select('*')
      .from('account')
      .where({ email })
      .first();
  },
  async createAccount({ accountId, email, hash }) {
    const rows = await db('account')
      .insert({
        account_id: accountId,
        email,
        hash,
      }, ['account_id']);
    return rows[0].account_id;
  },
});

module.exports = PostgresAccountRepository;
