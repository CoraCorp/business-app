import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import uuid from 'uuid/v4';
import * as routes from '../utils/routing/routes';

const CreateApp = ({ onAppCreated }) => {
  const history = useHistory();
  const formRef = useRef();

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
    onAppCreated(app);
    history.push(routes.MANAGE_APP.replace(':id', app.id));
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

export default CreateApp;
