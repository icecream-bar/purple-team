const router = require('nordic/ragnar').router();
const pixService = require('../services/pix');

// Saque-Troco page
router.get('/saque/search', async (req, res) => {
  try {
    const results = await pixService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

// Saldos page
router.get('/downloadExtract/:downloadDate', async (req, res) => {
  try {
    const downloadUrl = await pixService.getDownloadExtractUrl(
      req.params.downloadDate,
      req.user.sessionId,
      req.context,
    );
    res.json(downloadUrl);
  } catch (e) {
    res.status(e.status).json(e);
  }
});

router.get('/balance', async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    const balance = await pixService.getBalance(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(balance);
  } catch (e) {
    res.status(e.status).json(e);
  }
});

router.post('/reda022/update', async (req, res) => {
  try {
    const response = await pixService.updateReda022(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(response);
  } catch (e) {
    res.status(e.status).json(e);
  }
});

router.get('/reda022/search', async (req, res) => {
  try {
    const response = await pixService.searchReda022(
      req.params,
      req.user.sessionId,
      req.context,
    );
    res.json(response);
  } catch (e) {
    res.status(e.status).json(e);
  }
});

module.exports = router;
