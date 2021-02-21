import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, InputText } from '../commonComponents';
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
        <div>
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
