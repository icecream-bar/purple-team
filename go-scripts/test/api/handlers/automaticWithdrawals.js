const router = require('nordic/ragnar').router();
const AutomaticWithdrawalsService = require('../services/automaticWithdrawals');

router.get('/search', async (req, res) => {
  try {
    const automaticWithdrawals = await AutomaticWithdrawalsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawals);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/cbt/search', async (req, res) => {
  try {
    const automaticWithdrawals = await AutomaticWithdrawalsService.searchCbt(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawals);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const automaticWithdrawalsCreate = await AutomaticWithdrawalsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawalsCreate);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/cbt/create', async (req, res) => {
  try {
    const automaticWithdrawalsCreate = await AutomaticWithdrawalsService.createCBT(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawalsCreate);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/modify', async (req, res) => {
  try {
    const automaticWithdrawalsModify = await AutomaticWithdrawalsService.modify(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawalsModify);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/cbt/modify', async (req, res) => {
  try {
    const automaticWithdrawalsModify = await AutomaticWithdrawalsService.modifyCBT(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(automaticWithdrawalsModify);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

module.exports = router;
