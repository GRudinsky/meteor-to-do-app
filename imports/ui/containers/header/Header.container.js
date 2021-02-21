import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button } from '../../components/commonComponents';
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

  return (
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>ToDoo { pendingTasksTitle }</h1>
          { user &&
            <div className="user-details">
              <h2>{ user.username }</h2>
              <Button
                id="buttonLogout"
                text="Logout"
                clickHandler={ () => Meteor.logout() }
                primary
              />
            </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;