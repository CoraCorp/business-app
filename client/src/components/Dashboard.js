import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RegisteredAppService from '../services/RegisteredAppService';
import { useAuth0 } from '../utils/auth/auth0';
import * as routes from '../utils/routing/routes';

const Dashboard = () => {
  const { loading, getAccessTokenSilently } = useAuth0();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!loading) {
      getAccessTokenSilently()
        .then(accessToken =>
          new RegisteredAppService(accessToken).getRegisteredApps()
        )
        .then(data => setApps(data));
    }
  }, [loading, getAccessTokenSilently]);

  return (
    <div>
      <div>Your Apps:</div>
      {apps.map(a => (
        <Link key={a.id} to={routes.MANAGE_APP.replace(':id', a.id)}>
          {a.name}
        </Link>
      ))}
      <Link to={routes.CREATE_APP}>Add New App</Link>
    </div>
  );
};

export default Dashboard;
