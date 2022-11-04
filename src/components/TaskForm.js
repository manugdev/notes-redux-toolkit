import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/task/taskSlice'
import {v4 as uuid} from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const tasks = useSelector(state => state.task)

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(params.id){
      dispatch(editTask(task))
    }else{
      dispatch(addTask({
        ...task,
        id: uuid(),
      }))
    }
    navigate('/')
  }

  useEffect(() => {
    if(params.id){
      setTask(tasks.find(task => task.id === params.id))
    }
  }, [params.id, tasks])
  

  return (
    <form className='bg-zinc-800 max-w-sm p-4 mb-2' onSubmit={handleSubmit}>
      <label htmlFor='title' className='block text-sm font-bold mb-2'>Task:</label>
      <input className='w-full p-2 rounded-md bg-zinc-600 mb-2' value={task.title} onChange={handleChange} name='title' type='text' placeholder='Task title' />
      <label htmlFor='description' className='block text-sm font-bold mb-2'>Description:</label>
      <textarea className='resize-none w-full p-2 rounded-md bg-zinc-600' value={task.description} onChange={handleChange} name='description' placeholder='Description'></textarea>
      <button className='bg-indigo-600 px-2 py-1'>Save</button>
    </form>
  )
}

export default TaskForm