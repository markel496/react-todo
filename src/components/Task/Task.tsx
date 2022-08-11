import { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from './Task.module.scss'
import { ReactComponent as RemoveIcon } from './trash.svg'
import { ReactComponent as EditIcon } from './edit.svg'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import { useHandleClick } from '../../hooks/useHandleClick'
import {
  getContainerStyle,
  getTaskNameStyle,
  getTaskDescrStyle,
} from '../../utils/taskStyles'
import { ITask } from '../../models'

type TProps = {
  task: ITask
  updateTasks: (
    id: ITask['id'],
    stage: string,
    name?: ITask['name'],
    descr?: ITask['descr']
  ) => void
  removeTask: (deletedTaskId: ITask['id']) => void
}

const Task = ({ task, updateTasks, removeTask }: TProps) => {
  const [{ id, name, descr, inProgress, isCompleted, editing }, setTask] =
    useState(task) //Методом деструктуризации получаю свойства объекта task
  const [edit, setEdit] = useState(editing) //Состояние редактирования
  const [inputValue, setInputValue] = useState(name) // состояние input
  const [textareaValue, setTextareaValue] = useState(descr) // состояние textarea
  const [isValid, setIsValid] = useState(true) // Состояние для того, чтобы запрещать редактирование задачи и изменять стиль инпута

  const buttonRef = useRef(null) // Ref на кнопку "Добавить", чтобы отслеживать клик по ней с помощью хука useHandleClick

  //Функции из файла taskStyles.js возвращают нужные стили, которые записываю в переменные
  const styleContainer = getContainerStyle(isCompleted, inProgress, edit)

  const styleTaskName = getTaskNameStyle(isCompleted, inProgress)

  const styleTaskDescr = getTaskDescrStyle(isCompleted, inProgress)

  //Изменяю состояния task и обновляю tasks с помощью updateTasks()
  const startTask = () => {
    setTask({ ...task, inProgress: true })
    updateTasks(id, 'start')
  }

  const stopTask = () => {
    setTask({ ...task, inProgress: false })
    updateTasks(id, 'stop')
  }

  const checkboxHandler = () => {
    setTask({ ...task, inProgress: false, isCompleted: !isCompleted })
    updateTasks(id, 'completed')
  }

  const taskEdit = () => {
    updateTasks(id, 'editing')
    setEdit(true)
  }

  const cancelTaskEdit = () => {
    updateTasks(id, 'editing')
    setInputValue(name)
    setTextareaValue(descr)
    setEdit(false)
  }

  const changeTask = () => {
    if (inputValue.trim().length !== 0) {
      setTask({ ...task, name: inputValue, descr: textareaValue })
      updateTasks(id, 'update', inputValue, textareaValue)
      setEdit(false)
    } else {
      setInputValue('')
      setIsValid(false)
    }
  }

  //Если не кликнул на buttonRef, изменяю состояние isValid на true
  useHandleClick(isValid, setIsValid, buttonRef)

  return (
    <li className={styleContainer}>
      {!edit ? (
        <>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isCompleted}
            onChange={checkboxHandler}
          />
          <div className={styles.taskContainer}>
            <button className={styles.editButton} onClick={taskEdit}>
              <EditIcon />
            </button>
            <button
              className={styles.removeButton}
              onClick={() => removeTask(id)}
            >
              <RemoveIcon />
            </button>
            <h4 className={styleTaskName}>{name}</h4>
            {/* Если в textarea был ввод с новой строки, создаю массив строк */}
            {descr &&
              descr.split('\n').map((el, i) => (
                <p key={i} className={styleTaskDescr}>
                  {el}
                </p>
              ))}
            {!isCompleted && !inProgress && (
              <button className={styles.startButton} onClick={startTask}>
                Начать
              </button>
            )}
            {!isCompleted && inProgress && (
              <>
                <button className={styles.stopButton} onClick={stopTask}>
                  Остановить
                </button>
                <div className={styles.loader}></div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Input
            value={inputValue}
            onChange={setInputValue}
            valid={isValid}
            setIsValid={setIsValid}
          />
          <Textarea value={textareaValue} onChange={setTextareaValue} />
          <div className={styles.buttonsContainer}>
            <button
              ref={buttonRef}
              className={styles.changeButton}
              onClick={changeTask}
            >
              Изменить
            </button>
            <button
              className={styles.stopButton + ' ' + styles._edit}
              onClick={cancelTaskEdit}
            >
              Отмена
            </button>
            {inProgress && <div className={styles.loader}></div>}
          </div>
        </>
      )}
    </li>
  )
}

export default Task
