import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import { useState } from 'react'
import { AiFillAlert } from "react-icons/ai";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Default 1',
            reminder: true,
            day: '29th November at 2:30pm'
        },
        {
            id: 2,
            text: 'Default 2',
            reminder: false,
            day: '23rd September at 1:30pm'
        },
        {
            id: 3,
            text: 'Default 3',
            reminder: true,
            day: '1st January at 12:01am'
        },
    ])
  
  
  // Add Task
  const addTask = (task) => {
    const id = tasks.length + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder:!task.reminder}: task))
  }

  // Toggle Add Taks Form
  const toggleForm = () => {
    setShowAddTask(!showAddTask)
  }  
  
  return (
    <div className='container'>
      <Header onAdd={toggleForm} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:
      <p><AiFillAlert style={{color:'red'}}/> There are no tasks left to display!</p> 
      }
    </div>
  );
}

export default App;
