import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';

export const Header = ({ authenticated }) => {

  //TODO move to utils/filters
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${ authenticated && pendingTasksCount ? ` (${ pendingTasksCount })` : ''
    }`;

  const handleLogout = () => localStorage.removeItem('Meteor.loginToken');

  return (
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>ToDoo { pendingTasksTitle }</h1>
          { authenticated &&
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