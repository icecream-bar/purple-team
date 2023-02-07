/**
 * Massive actions handlers
 */
const router = require('nordic/ragnar').router();
const config = require('nordic/config');
const log = require('nordic/logger')('api.handlers.massiveActions');
const http = require('http'); // en desa usar https
const pathLibrary = require('path');
const MassiveActionsService = require('../services/massiveActions');

router.post('/create', async (req, res) => {
  try {
    const massiveActions = await MassiveActionsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(massiveActions);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const massiveActions = await MassiveActionsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(massiveActions);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/processes/summary/:id', async (req, res) => {
  try {
    const massiveActions = await MassiveActionsService.summary(
      req.params.id,
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(massiveActions);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/processes/search', async (req, res) => {
  try {
    const massiveActions = await MassiveActionsService.processes(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(massiveActions);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/processes/download', async (req, res) => {
  try {
    const options = {
      headers: {
        'X-Auth': req.user.sessionId,
        ...req.context,
      },
    };
    let path = `/process/download?massive_action_id=${req.query.massive_action_id}`;
    path = pathLibrary.normalize(path);
    if (path.startsWith('/process/download')) {
      try {
        res.setHeader('Content-Disposition', `attachment; filename=process-${req.query.massive_action_id}.txt`);
        res.setHeader('Content-Type', 'text/csv');
        http.get(`${config.api.internal.baseUrlME}${path}`,
          options, (response) => response.pipe(res));
      } catch (e) {
        log.error('Error in download processes.', { status: e.status, message: e.message, ...req.context });
        res.status(e.status || 500).json({ error: e.message });
      }
    }
  } catch (e) {
    res.status(e.status || 500).json(e);
  }
});

module.exports = router;
