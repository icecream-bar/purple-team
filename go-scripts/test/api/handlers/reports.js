const router = require('nordic/ragnar').router();
const http = require('http');
const pathLibrary = require('path');
const config = require('nordic/config');
const ReportsService = require('../services/reports');

router.get('/search', async (req, res) => {
  try {
    const reports = await ReportsService.search(
      req.query,
      req.user.sessionId,
      req.context,
    );
    res.json(reports);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const reports = await ReportsService.create(
      req.body,
      req.user.sessionId,
      req.context,
    );
    res.json(reports);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

router.get('/download/:reportName', async (req, res, next) => { // eslint-disable-line no-unused-vars
  const options = {
    headers: {
      'X-Auth': req.user.sessionId,
      ...req.context,
    },
  };
  let path = `/report/download/${req.params.reportName}`;
  path = pathLibrary.normalize(path);
  if (path.startsWith('/report/download/')) {
    try {
      res.setHeader('Content-Disposition', `attachment; filename=${req.params.reportName}`);
      res.setHeader('Content-Type', 'text/csv');
      http.get(`${config.api.internal.baseUrlME}${path}`, options, (response) => {
        response.pipe(res);
      });
    } catch (e) {
      res.status(e.status || 500).json({ error: e.message });
    }
  }
});

module.exports = router;
