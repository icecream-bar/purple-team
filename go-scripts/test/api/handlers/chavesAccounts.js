const router = require('nordic/ragnar').router();
const chavesService = require('../services/chavesAccounts');

router.post('/search', async (req, res) => {
  try {
    const accounts = await chavesService.search(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(accounts);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const accounts = await chavesService.createKey(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(accounts);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/massive-delete', async (req, res) => {
  try {
    const response = await chavesService.massiveDelete(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(response);
  } catch (e) {
    res.status(e.status || 424).json({ error: e.message });
  }
});

module.exports = router;
