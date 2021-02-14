import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import './TaskForm.scss';

export const TaskForm = () => {
  const [text, setText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    //TODO: move to server utils
    TasksCollection.insert(
      {
        text: text,
        createdAt: new Date()
      }
      );
    setText('');
  };

  return (
    <form 
      className="task-form"
      onSubmit = { handleSubmit }
    >
      <input
        type="text"
        value = { text }
        placeholder="Type to add new tasks"
        onChange={ e => setText(e.target.value) }
      />
      <button 
        type="submit"
        disabled={ !text }
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;