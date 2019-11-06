const { Router } = require('express');
const asyncWrapper = require('../middlewares/async');

const AccountController = ({ accountService }) => {
  const router = Router();

  router.post('/register', asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const account = await accountService.register({
      email,
      password,
    });
    res.json(account);
  }));

  router.post('/login', asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const token = await accountService.login({
      email,
      password,
    });
    res.json(token);
  }));

  return router;
};

module.exports = AccountController;
