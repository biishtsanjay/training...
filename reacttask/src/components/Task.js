import { useState } from 'react';
import '../styles/task.scss';

export default function Task(props) {
  const { addTask, deleteTask, task } = props;
  const [ collapsed, setCollapsed ] = useState(task.isCollapsed);
  const [ formAction, setFormAction ] = useState("");
  // console.log(props);


  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } 
      else {
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          status: task.status,
          isCollapsed: true
        }
        addTask(newTask);
        setCollapsed(true);
      }
    }
    if (formAction === 'delete') {
      deleteTask(task.id);
    }
  }


  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          rows="3"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />

        <button
          onClick={() => {
            setFormAction("save")
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        <br></br>

        {!collapsed && <button
          onClick={() => {
            setFormAction("delete");
          }}
          className="button delete"
        >
          Cancel
        </button>
        }

        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            delete
          </button>
        )}
      </form>
    </div>
  )
}