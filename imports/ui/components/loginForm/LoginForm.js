import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button } from '../commonComponents';
import './LoginForm.scss';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={ submit }
      className="login-form"
    >
      <div>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={ e => setUsername(e.target.value) }
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={ e => setPassword(e.target.value) }
        />

        { /* <button type="submit">Log In</button> */ }
        <Button 
          text="Login"
          primary
          id="buttonLogin"
        />
      </div>
    </form>
  );
};

export default LoginForm;
