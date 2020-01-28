const service = require('../../services/registered-applications.service');

const getApps = async (req, res) => {
  const apps = await service.getRegisteredApps(req.user.sub);
  res.json(apps);
};

const getApp = async (req, res) => {
  const app = await service.getRegisteredApp(req.user.sub, req.params.id);
  if (app) {
    res.json(app);
  } else {
    res.sendStatus('404');
  }
};

const postApp = async (req, res) => {
  await service.createRegisteredApp(req.user.sub, req.body);
  res.sendStatus('200');
};

const putApp = (req, res) => {
  if (req.params.id.toLowerCase() === req.body.id.toLowerCase()) {
    if (service.updateRegisteredApp(req.user.sub, req.body)) {
      res.sendStatus('200');
    } else {
      res.sendStatus('400');
    }
  } else {
    res.sendStatus('400');
  }
};

module.exports = {
  getApps,
  getApp,
  postApp,
  putApp
};
