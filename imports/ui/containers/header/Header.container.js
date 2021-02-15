import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';

import { pendingOnlyFilter } from '/imports/utils/filters';
import './Header.container.scss';

export const Header = ({ user }) => {

  //TODO move to utils/filters

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(pendingOnlyFilter(user)).count()
  );

  const pendingTasksTitle = `${ user && pendingTasksCount ? ` (${ pendingTasksCount })` : ''
    }`;

  const handleLogout = () => localStorage.removeItem('Meteor.loginToken');

  return (
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>ToDoo { pendingTasksTitle }</h1>
          { user &&
            <button
              onClick={ handleLogout }
            >
              Logout
            </button>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;