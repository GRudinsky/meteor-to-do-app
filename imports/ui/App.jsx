import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Header from './Header';
import Tasks from './Tasks.container';
import LoginForm from './LoginForm';

export const App = () => {

  const authenticated = useTracker(() => Meteor.user());

  return (
    <div className="app">
      <Header 
        authenticated={ authenticated }
      />
      <div className="main">
        { authenticated 
        ? <Tasks/>
        : <LoginForm/>
      }
      </div>
    </div>
  );
};
