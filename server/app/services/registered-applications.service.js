let appsByUser = {};

const createRegisteredApp = (userId, app) => {
  appsByUser[userId] = [...getRegisteredApps(userId), app];
};

const getRegisteredApps = userId => {
  return appsByUser[userId] || [];
};

const getRegisteredApp = (userId, appId) => {
  const apps = getRegisteredApps(userId);
  const app = apps.find(a => a.id.toLowerCase() === appId.toLowerCase());
  return app;
};

const updateRegisteredApp = (userId, app) => {
  let apps = getRegisteredApps(userId);
  apps = apps.map(a => (a.id.toLowerCase() === app.id.toLowerCase() ? app : a));
  appsByUser[userId] = apps;
};

const deleteRegisteredApp = (userId, appId) => {
  appsByUser[userId] = getRegisteredApps(userId).filter(
    a => a.id.toLowerCase() !== appId
  );
};

module.exports = {
  createRegisteredApp,
  getRegisteredApps,
  getRegisteredApp,
  updateRegisteredApp,
  deleteRegisteredApp
};
