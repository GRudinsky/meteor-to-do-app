import React, { useState } from 'react';
import { Button, InputText } from '../commonComponents/';
import './TaskForm.scss';

export const TaskForm = () => {
  const [text, setText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  return (
    <form 
      className="task-form"
      onSubmit = { handleSubmit }
    >
      <InputText 
        id="inputTask"
        type="text"
        value={ text }
        placeholder="Type to add new tasks"
        changeHandler={ e => setText(e.target.value) }
      />
      <Button 
        id="buttonSubmit"
        text="Add task"
        disabled={ !text }
      />
    </form>
  );
};

export default TaskForm;