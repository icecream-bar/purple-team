const router = require('nordic/ragnar').router();
const asyncProcessesService = require('../services/asyncProcesses');

router.get('/search', async (req, res) => {
  try {
    const results = await asyncProcessesService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.get('/detail', async (req, res) => {
  try {
    const results = await asyncProcessesService.getDetail(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(results);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    const actionResults = await asyncProcessesService.create(
      body,
      req.user.sessionId,
      req.context,
    );
    res.json(actionResults);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/send-approval', async (req, res) => {
  try {
    const actionResults = await asyncProcessesService.sendApproval(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(actionResults);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.get('/download-file/:processId', async (req, res) => {
  try {
    const { processId } = req.params;
    const results = await asyncProcessesService.getDownloadFile(
      processId,
      req.user.sessionId,
      req.context,
    );
    res.setHeader('Content-Disposition', `attachment; filename="async_process_${processId}.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.end(results.data);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
});

module.exports = router;
