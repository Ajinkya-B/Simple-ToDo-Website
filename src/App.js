import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'
import { AiFillAlert } from "react-icons/ai";

const App = () => {
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
  
  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder:!task.reminder}: task))
    console.log(tasks)
  }
  
  
  return (
    <div className='container'>
      <Header />
      {tasks.length > 0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:
      <p><AiFillAlert style={{color:'red'}}/> There are no tasks left to display!</p> 
      }
    </div>
  );
}

export default App;
