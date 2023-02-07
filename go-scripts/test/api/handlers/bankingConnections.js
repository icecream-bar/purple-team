const router = require('nordic/ragnar').router();
const bankingConnectionsService = require('../services/bankingConnections');

router.get('/search', async (req, res) => {
  try {
    const bankingConnections = await bankingConnectionsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(bankingConnections);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/massive-search', async (req, res) => {
  try {
    const bankingConnections = await bankingConnectionsService.massiveSearch(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(bankingConnections);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
