import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import Task from '../../components/task';
import TaskForm from '../../components/taskForm';
import { Button, Loader } from '../../components/commonComponents';
import { userFilter, pendingOnlyFilter } from '/imports/utils/filters';
import './Tasks.container.scss';


export const Tasks = ({ user }) => {
  
  const [hideCompleted, setHideCompleted] = useState(false);

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks:[], pendingTasksCount:0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return { tasks };
  });

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
  };

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

  const uncheckedTasks = tasks.filter(task => !task.isChecked);
  const checkedTasks = tasks.filter(task => task.isChecked);

  return (
    <div className="container">
      <TaskForm 
        user={ user }
      />
      { isLoading && <Loader/> }
      <ul className="tasks">
        { uncheckedTasks.map(task =>
          <Task
            key={ task._id }
            task={ task }
            onCheckboxClick={ toggleChecked }
            onDeleteClick={ deleteTask }
          />
        ) }
      </ul>
      <div className="filter">
        <div>
          { !hideCompleted &&
            <h2>{ `Completed (${ checkedTasks.length })` }</h2>
          }
        </div>
        <Button
          id="buttonHideCompleted"
          text={ hideCompleted ? 'Show All' : 'Hide Completed' }
          clickHandler={ () => setHideCompleted(!hideCompleted) }
          secondary
        />
      </div>
      { !hideCompleted &&
        <>
          <ul className="tasks">
            { checkedTasks.map(task =>
              <Task
                key={ task._id }
                task={ task }
                onCheckboxClick={ toggleChecked }
                onDeleteClick={ deleteTask }
              />
            ) }
          </ul>
        </>
      }
    </div>
  );
};

export default Tasks;