const router = require('nordic/ragnar').router();
const MoneyInService = require('../services/moneyIn');

router.get('/search', async (req, res) => {
  try {
    const moneyIns = await MoneyInService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(moneyIns);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/massive-search', async (req, res) => {
  try {
    const moneyIns = await MoneyInService.massiveSearch(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(moneyIns);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
