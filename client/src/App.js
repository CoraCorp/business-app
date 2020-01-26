import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ManageApp from './components/ManageApp';
import NavBar from './components/NavBar';
import RegisterApp from './components/RegisterApp';
import { useAuth0 } from './utils/auth/auth0';
import history from './utils/routing/history';
import * as routes from './utils/routing/routes';

function App() {
  const { isAuthenticated } = useAuth0();

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
                <ManageApp />
              </Route>
              <Route path={routes.CREATE_APP}>
                <RegisterApp />
              </Route>
              <Route path={routes.HOME}>
                <Dashboard />
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
