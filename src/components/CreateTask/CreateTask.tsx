import { useState, useRef, SetStateAction, Dispatch } from 'react'
import styles from './CreateTask.module.scss'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import { useHandleClick } from '../../hooks/useHandleClick'
import { ITask } from '../../models'

import moment from 'moment'
import 'moment/locale/ru'

type TProps = {
  tasks: ITask[]
  addTask: Dispatch<SetStateAction<ITask[]>>
}

const CreateTask = ({ tasks, addTask }: TProps) => {
  const [inputValue, setInputValue] = useState('') //Состояние input
  const [textareaValue, setTextareaValue] = useState('') //Состояние textarea
  const [isValid, setIsValid] = useState(true) // Состояние для того, чтобы запрещать добавление задачи и изменять стиль инпута
  const buttonRef = useRef<HTMLButtonElement>(null) // Ref на кнопку "Добавить", чтобы отслеживать клик по ней с помощью хука useHandleClick

  //Добавление задачи в список
  const addHandler = () => {
    //если в инпуте что-то есть
    if (inputValue.trim().length !== 0) {
      addTask([
        {
          id: Math.random().toString(36).substring(2, 9), //уникальный ключ в виде строки
          name: inputValue.replace(/\s{2,}/g, ' ').trim(), //удаляет лишние пробелы
          descr: textareaValue.replace(/\s{2,}/g, ' ').trim(),
          createdAt: moment().format('l в LT'), // Дата создания
          inProgress: false, //В процессе/не в процессе
          isCompleted: false, //Завершена/не завершена
          editing: false //редактируется/не редактируется
        },
        ...tasks
      ])
      setInputValue('')
      setTextareaValue('')
      setIsValid(true)
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    } else {
      setInputValue('')
      setIsValid(false)
    }

    if (textareaValue.trim().length === 0) {
      setTextareaValue('')
    }
  }

  //Если не кликнул на buttonRef, изменяю состояние isValid на true
  useHandleClick(isValid, setIsValid, buttonRef)

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Создание задачи:</h3>
      <Input
        value={inputValue}
        onChange={setInputValue}
        valid={isValid}
        setIsValid={setIsValid}
      />
      <Textarea value={textareaValue} onChange={setTextareaValue} />

      <button ref={buttonRef} className={styles.createBtn} onClick={addHandler}>
        Добавить
      </button>
    </div>
  )
}

export default CreateTask
