const router = require('nordic/ragnar').router();
const manualWithdrawalsService = require('../services/manualWithdrawals');

router.post('/create', async (req, res) => {
  try {
    const results = await manualWithdrawalsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

module.exports = router;
