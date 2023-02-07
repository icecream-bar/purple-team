const router = require('nordic/ragnar').router();
const allowedUsersService = require('../services/allowedUsers');

router.get('/search', async (req, res) => {
  try {
    const results = await allowedUsersService.search(
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const results = await allowedUsersService.updateList(
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
