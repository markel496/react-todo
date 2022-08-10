import React, { useState } from 'react'
import Search from '../UI/Search/Search'
import Task from '../Task/Task'
import styles from './TaskList.module.scss'

const TaskList = ({ tasks, setTasks }) => {
  const [searchValue, setSearchValue] = useState('') //Состояние инпута, который отвечает за поиск

  //Функция удаления задачи
  const removeTask = (deletedTaskId) =>
    setTasks(tasks.filter((task) => task.id !== deletedTaskId))

  //Функция изменяет состояние tasks, когда в task происходят изменения
  const updateTasks = (id, stage, name, descr) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          switch (stage) {
            case 'start':
              return { ...task, inProgress: true, isCompleted: false }

            case 'stop':
              return { ...task, inProgress: false, isCompleted: false }

            case 'completed':
              return {
                ...task,
                inProgress: false,
                isCompleted: !task.isCompleted ? true : false,
              }

            case 'editing':
              return { ...task, editing: !task.editing ? true : false }

            case 'update':
              return { ...task, name, descr, editing: false }
          }
        }
        return task
      })
    )
  }

  //В items содержатся задачи, названия которых содержат searchValue. Если searchValue пуст - items = tasks
  const items = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchValue.toLowerCase().trim())
  )

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Список задач:</h3>
      {tasks.length > 0 && (
        <Search value={searchValue} onChange={setSearchValue} />
      )}
      {tasks.length === 0 && <p className={styles.p}>Нет задач</p>}
      {items.length > 0 && (
        <ul>
          {items.map((task) => (
            <Task
              key={task.id}
              task={task}
              updateTasks={updateTasks}
              removeTask={removeTask}
            />
          ))}
        </ul>
      )}
      {items.length === 0 && searchValue && (
        <p className={styles.p}>Задачи "{searchValue}" нет в списке</p>
      )}
    </div>
  )
}

export default TaskList
