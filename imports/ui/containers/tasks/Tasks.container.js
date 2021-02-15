import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import Task from '../../components/task';
import TaskForm from '../../components/taskForm';
import { userFilter, pendingOnlyFilter } from '/imports/utils/filters';
import './Tasks.container.scss';


export const Tasks = ({ user }) => {
  
  const [hideCompleted, setHideCompleted] = useState(false);

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter(user) : userFilter(user),
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  }
  );

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    });
  };

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  const uncheckedTasks = tasks.filter(task => !task.isChecked);
  const checkedTasks = tasks.filter(task => task.isChecked);

  return (
    <Fragment>
      <TaskForm 
        user={ user }
      />
      <div className="filter">
        <button onClick={ () => setHideCompleted(!hideCompleted) }>
          { hideCompleted ? 'Show All' : 'Hide Completed' }
        </button>
      </div>
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
      { !hideCompleted &&
        <>
          <h2>Completed tasks</h2>
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
    </Fragment>
  );
};

export default Tasks;