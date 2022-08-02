
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AiFillAlert } from "react-icons/ai";
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  


  // Fetching Tasks from JSON Server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const  data = await response.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const  data = await response.json()

    return data
  }
    
  // Add Task
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await response.json()

    setTasks([...tasks, data])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      'body': JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder}: task))
  }

  // Toggle Add Taks Form
  const toggleForm = () => {
    setShowAddTask(!showAddTask)
  }  
  
  return (
    <Router>
      <div className='container'>
        <Header onAdd={toggleForm} showAdd={showAddTask}/>
        <Routes>
          <Route path='/' element={
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:
            <p><AiFillAlert style={{color:'red'}}/> There are no tasks left to display!</p> }
          </>
          } />
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
