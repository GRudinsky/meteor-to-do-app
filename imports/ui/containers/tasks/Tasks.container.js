import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import Task from '../../components/task';
import TaskForm from '../../components/taskForm';
import './Tasks.container.scss';


export const Tasks = () => {
  
  const [hideCompleted, setHideCompleted] = useState(false);

  const authenticated = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() => authenticated && TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    });
  };
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  const filterUncheckedTasks = () => tasks.filter(task => !task.isChecked);
  const filterCheckedTasks = () => tasks.filter(task => task.isChecked);

  return (
    <Fragment>
      <TaskForm />
      <div className="filter">
        <button onClick={ () => setHideCompleted(!hideCompleted) }>
          { hideCompleted ? 'Show All' : 'Hide Completed' }
        </button>
      </div>
      <ul className="tasks">
        { filterUncheckedTasks().map(task =>
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
            { filterCheckedTasks().map(task =>
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