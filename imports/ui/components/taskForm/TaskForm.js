import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Button, InputText } from '../commonComponents/';
import './TaskForm.scss';

export const TaskForm = ({ user }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    //TODO: move to server utils
    TasksCollection.insert(
      {
        text: text,
        createdAt: new Date(),
        isChecked: false,
        userId: user._id
      });
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