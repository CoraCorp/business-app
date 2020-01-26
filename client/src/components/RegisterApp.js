import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import uuid from 'uuid/v4';
import RegisteredAppService from '../services/RegisteredAppService';
import { useAuth0 } from '../utils/auth/auth0';
import * as routes from '../utils/routing/routes';

const RegisterApp = () => {
  const history = useHistory();
  const formRef = useRef();
  const { getAccessTokenSilently } = useAuth0();

  function handleSubmit(e) {
    e.preventDefault();
    const controls = Array.from(formRef.current.elements);
    const app = controls
      .filter(c => c.name)
      .reduce(
        (acc, cur) => {
          acc[cur.name] = cur.value;
          return acc;
        },
        { id: uuid() }
      );

    getAccessTokenSilently()
      .then(accessToken =>
        new RegisteredAppService(accessToken).registerNewApp(app)
      )
      .then(successful => {
        if (successful) {
          history.push(routes.MANAGE_APP.replace(':id', app.id));
        }
      });
  }

  function handleNameChange(e) {
    // TODO: make sure the name is not in use
  }

  return (
    <div>
      <Link to={routes.HOME}>Back</Link>Create App
      <div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name: <input name="name" onChange={handleNameChange} required />
          </label>
          <label>
            Origin URL: <input name="origin" />
          </label>
          <label>
            Subscriber URL: <input name="subscriber" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterApp;
