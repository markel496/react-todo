import React, { useEffect, useState } from 'react'
import CreateTask from '../CreateTask/CreateTask'
import TaskList from '../TaskList/TaskList'
import styles from './Container.module.scss'
import { getTasksFromLS, saveTasksInLS } from '../../utils/lsFuncs'

const Container = () => {
  //задачи из localStorage. Если localStorage пуст - tasks = []
  const [tasks, setTasks] = useState(getTasksFromLS() || [])

  //Обновляю localStorage при изменении tasks
  useEffect(() => {
    saveTasksInLS(tasks)
  }, [tasks])

  return (
    <div className={styles.container}>
      <TaskList tasks={tasks} setTasks={setTasks} />
      <CreateTask tasks={tasks} addTask={setTasks} />
    </div>
  )
}

export default Container
