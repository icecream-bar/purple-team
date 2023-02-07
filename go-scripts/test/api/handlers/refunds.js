const router = require('nordic/ragnar').router();
const RefundsService = require('../services/refunds');

router.get('/search', async (req, res) => {
  try {
    const refunds = await RefundsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(refunds);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const refundRequest = await RefundsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(refundRequest);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/refund', async (req, res) => {
  try {
    const refundRequest = await RefundsService.refund(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(refundRequest);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/download', async (req, res) => {
  try {
    const response = await RefundsService.download(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(response);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
