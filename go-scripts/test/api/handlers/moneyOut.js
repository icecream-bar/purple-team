const router = require('nordic/ragnar').router();
const MoneyOutService = require('../services/moneyOut');

router.get('/search', async (req, res) => {
  try {
    const moneyOuts = await MoneyOutService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(moneyOuts);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/massive-search', async (req, res) => {
  try {
    const moneyOuts = await MoneyOutService.massiveSearch(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(moneyOuts);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
