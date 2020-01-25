import React, { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as routes from '../utils/routing/routes';

const ManageApp = ({ apps, onAppUpdated }) => {
  const formRef = useRef();
  const { id } = useParams();
  const history = useHistory();
  let app = apps.find(a => a.id.toLowerCase() === id.toLowerCase());

  if (!app) {
    console.log(apps);
    history.replace(routes.HOME);
  }

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
    onAppUpdated(updatedApp);
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
