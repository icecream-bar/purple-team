const router = require('nordic/ragnar').router();
const tedService = require('../services/tedAccounts');

router.get('/search', async (req, res) => {
  try {
    const accounts = await tedService.search(
      req.query,
      req.headers,
      req.user.sessionId,
      req.context,
    );
    res.json(accounts);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.put('/:account_id', async (req, res) => {
  try {
    const actionResults = await tedService.disable(
      req.params.account_id,
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
    const actionResults = await tedService.create(
      req.query.user_id,
      req.user.sessionId,
      req.context,
    );
    res.json(actionResults);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
