import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../utils/routing/routes';

const Dashboard = ({ apps }) => {
  return (
    <div>
      <div>Your Apps:</div>
      {apps.map(a => (
        <div key={a.name}>{JSON.stringify(a)}</div>
      ))}
      <Link to={routes.CREATE_APP}>Add New App</Link>
    </div>
  );
};

export default Dashboard;
