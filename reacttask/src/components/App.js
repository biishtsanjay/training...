import React from "react";
import '../styles/App.scss';
import StatusLine from "./StatusLine";
import { useState, useEffect } from "react";
import props from 'prop-types';


function App() {
  const [ tasks, setTasks ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[ tasks.length - 1 ];
    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }
    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        status: status
      }
    ])
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    })
    let newTaskList = [ ...filteredTasks, taskToAdd ];
    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    })
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks)
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })
    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    })
    task.status = newStatus;
    let newTaskList = [ ...filteredTasks, task ]
    setTasks(newTaskList)
    saveTasksToLocalStorage(newTaskList)
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem('tasks');
    let tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTasks(tasks);
    }
  }


  return (
    <div className="App">
      <h1>Task Manager</h1>
      <main>
        <section>
          <h2>
            <StatusLine
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              status="Today's Tasks"
              
            />
          </h2>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="Pending"
        
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="Abandoned"
          
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="Completed"
        
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            status="In-Progress"
        
          />
        </section>
      </main>
    </div>


  );
}

export default App;
