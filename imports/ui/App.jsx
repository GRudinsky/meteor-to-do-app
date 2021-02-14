import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Header from './containers/header';
import Tasks from './containers/tasks';
import LoginForm from './components/loginForm';

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
