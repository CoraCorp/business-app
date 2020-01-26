let apps = [];

const getApps = (req, res) => {
  res.json(apps);
};

const getApp = (req, res) => {
  const app = apps.find(
    a => a.id.toLowerCase() === req.params.id.toLowerCase()
  );
  if (app) {
    res.json(app);
  } else {
    res.sendStatus('404');
  }
};

const postApp = (req, res) => {
  apps.push(req.body);
  res.sendStatus('200');
};

const putApp = (req, res) => {
  if (req.params.id.toLowerCase() === req.body.id.toLowerCase()) {
    apps = apps.map(a =>
      a.id.toLowerCase() === req.body.id.toLowerCase() ? req.body : a
    );
    res.sendStatus('200');
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
