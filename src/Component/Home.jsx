import React, { useState, useEffect } from 'react';
import { db } from '../firbase'; 
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import './Home.css';
const Home = () => {
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState('');
  const [taskSection, setTaskSection] = useState('toDo');

  const handle = (index) => {
    console.log(`'clicked'${index}`);
    const taskElement = document.getElementById(`task-${index}`);
    taskElement.classList.toggle('hover-effect');
  };
 
}
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const data = snapshot.docs.reduce((acc, doc) => {
        const taskData = doc.data();
        if (!acc[taskData.section]) acc[taskData.section] = [];
        acc[taskData.section].push(taskData.task);
        return acc;
      }, {});
      setTasks(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await addDoc(collection(db, 'tasks'), {
        task: newTask.trim(),
        section: taskSection
      });

      setNewTask('');
      setTaskSection('toDo'); 
    }
  };

  return (
    <div className="task-board">
   <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <select
  className='select'
 value={taskSection}
          onChange={(e) => setTaskSection(e.target.value)}
        >
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>
          Add Task
        </button>
      </div>
   
      <div className="task-section" id='todo' >
    
        <h2>To Do</h2>
        <ul>
          {tasks.toDo?.map((task, index) => (
            <li className='task1' onClick={handle}  key={index}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="task-section" id='inprogress'>
        <h2>In Progress</h2>
        <ul>
          {tasks.inProgress?.map((task, index) => (
            <li className='task2'  key={index}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="task-section" id='completed' >
        <h2>Completed</h2>
        <ul>
          {tasks.completed?.map((task, index) => (
            <li className='task3' key={index}>{task}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Home;
