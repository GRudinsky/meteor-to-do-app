import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

//TODO move flushDB and seedDB to package.json script
const flushTasks = false;
const seedTasks = false;


const SEED_USERNAME = 'grudinsky';
const SEED_PASSWORD = 'password';

const user = Accounts.findUserByUsername(SEED_USERNAME);

//TODO: move to server/utils/tasks
const insertTask = (taskText, user) => TasksCollection.insert(
  { 
    text: taskText,
    userId: user._id,
    isChecked: false,
    createdAt: new Date(),
  });
  
const removeTasks = () => TasksCollection.remove({});


Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (flushTasks) {
    removeTasks();
  }

  if (seedTasks) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});
