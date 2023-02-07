const router = require('nordic/ragnar').router();
const transferManagerService = require('../services/transferManager'); // eslint-disable-line import/extensions

router.get('/search', async (req, res) => {
  try {
    const results = await transferManagerService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/detail', async (req, res) => {
  try {
    const results = await transferManagerService.detail(
      req.query.id,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

module.exports = router;
