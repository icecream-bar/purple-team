const router = require('nordic/ragnar').router();
const bankAcountsService = require('../services/bankAccounts');

router.get('/search', async (req, res) => {
  try {
    const results = await bankAcountsService.search(
      req.query,
      req.user.sessionId,
      req.context,
      req.headers.api,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.put('/:user_id/bank_accounts/:account_id', async (req, res) => {
  try {
    const actionResults = await bankAcountsService.modify(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(actionResults);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const actionResults = await bankAcountsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(actionResults);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/configurations', async (req, res) => {
  try {
    const results = await bankAcountsService.getConfigurations(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/form', async (req, res) => {
  try {
    const results = await bankAcountsService.getFormCreateBankAccout(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/table/config', async (req, res) => {
  try {
    const results = await bankAcountsService.getTableConfigBankAccout(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

module.exports = router;
