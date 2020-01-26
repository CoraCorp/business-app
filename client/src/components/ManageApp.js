import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RegisteredAppService from '../services/RegisteredAppService';
import { useAuth0 } from '../utils/auth/auth0';
import * as routes from '../utils/routing/routes';

const ManageApp = () => {
  const formRef = useRef();
  const { id } = useParams();
  const history = useHistory();
  const { loading, getAccessTokenSilently } = useAuth0();
  const [app, setApp] = useState();

  useEffect(() => {
    if (!loading) {
      getAccessTokenSilently()
        .then(accessToken =>
          new RegisteredAppService(accessToken).getRegisteredApp(id)
        )
        .then(res => {
          if (res) {
            setApp(res);
          } else {
            history.replace(routes.HOME);
          }
        });
    }
  }, [loading, getAccessTokenSilently]);

  function handleNameChange(e) {
    // TODO: make sure the name is not in use
  }

  function handleSubmit(e) {
    e.preventDefault();
    const controls = Array.from(formRef.current.elements);
    const updatedApp = controls
      .filter(c => c.name)
      .reduce(
        (acc, cur) => {
          acc[cur.name] = cur.value;
          return acc;
        },
        { ...app }
      );
    getAccessTokenSilently()
      .then(accessToken =>
        new RegisteredAppService(accessToken).updateApp(updatedApp)
      )
      .then(res => {
        if (res) {
          console.log('saved');
        } else {
          console.log('problem');
        }
      });
  }
  return (
    <div>
      {app && (
        <div>
          {app.id}
          <form ref={formRef} onSubmit={handleSubmit}>
            <label>
              Name:{' '}
              <input
                name="name"
                onChange={handleNameChange}
                defaultValue={app.name}
                required
              />
            </label>
            <label>
              Origin URL: <input name="origin" defaultValue={app.origin} />
            </label>
            <label>
              Subscriber URL:{' '}
              <input name="subscriber" defaultValue={app.subscriber} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageApp;
