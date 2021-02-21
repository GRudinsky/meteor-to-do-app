import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, InputText } from '../commonComponents';
import './LoginForm.scss';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => setError(''), [password, username]);

  const formatLoginError = (err) => err.error === 403
    ? 'Incorrect username or password'
    : err.reason;

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, err => setError(formatLoginError(err)));
  };

  return (
    <form onSubmit={ submit }
      className="login-form"
    >
      <div>
        <div>
          <p id="errorText"
            className="error-text"
          >{ error }</p>

          <label htmlFor="username">Username</label>
          <InputText
            type="text"
            placeholder="Username"
            name="username"
            required
            changeHandler={ e => setUsername(e.target.value) }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <InputText
            type="password"
            placeholder="Password"
            name="password"
            required
            changeHandler={ e => setPassword(e.target.value) }
          />
        </div>
        <div>
          <Button
            text="Login"
            primary
            id="buttonLogin"
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
