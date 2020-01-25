import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateApp from './components/CreateApp';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ManageApp from './components/ManageApp';
import NavBar from './components/NavBar';
import { useAuth0 } from './utils/auth/auth0';
import history from './utils/routing/history';
import * as routes from './utils/routing/routes';

function App() {
  const { isAuthenticated } = useAuth0();
  const [apps, setApps] = useState([]);

  function handleAppCreated(app) {
    setApps(s => [...s, app]);
  }

  function handleAppUpdated(app) {
    setApps(s =>
      s.map(a => (a.id.toLowerCase() === app.id.toLowerCase() ? app : a))
    );
  }

  return (
    <div>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <div>
          {isAuthenticated ? (
            <Switch>
              <Route path={routes.MANAGE_APP}>
                <ManageApp apps={apps} onAppUpdated={handleAppUpdated} />
              </Route>
              <Route path={routes.CREATE_APP}>
                <CreateApp onAppCreated={handleAppCreated} />
              </Route>
              <Route path={routes.HOME}>
                <Dashboard apps={apps} />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path={routes.HOME}>
                <Home />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
