const appQueries = require('../db/queries/registered-applications.queries');
const userQueries = require('../db/queries/users.queries');

module.exports = {
  createRegisteredApp: async (userId, app) => {
    const user = await userQueries.getById(userId);
    if (!user) {
      await userQueries.create(userId);
    }
    return await appQueries.createAppByUserId(userId, app);
  },
  getRegisteredApps: userId => appQueries.getAllByUserId(userId),
  getRegisteredApp: (userId, appId) => appQueries.getByUserId(userId, appId),
  updateRegisteredApp: (userId, app) =>
    appQueries.updateAppByUserId(userId, app)
};
