/**
 * Massive actions handlers
 */
const router = require('nordic/ragnar').router();
const ConfigurationsService = require('../services/massiveActions');

router.get('/search', async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    const massiveActions = await ConfigurationsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(massiveActions);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

module.exports = router;
