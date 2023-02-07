const router = require('nordic/ragnar').router();
const withdrawalsService = require('../services/withdrawals');

router.get('/search', async (req, res) => {
  try {
    const results = await withdrawalsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/createreport', async (req, res) => {
  try {
    const results = await withdrawalsService.createReport(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/details', async (req, res) => {
  try {
    const results = await withdrawalsService.details(
      req.query.id,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/config', async (req, res) => {
  try {
    const results = await withdrawalsService.getconfig(
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
