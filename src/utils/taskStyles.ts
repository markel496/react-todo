import styles from '../components/Task/Task.module.scss'

//Функции возвращают нужные стили в зависимости от состояния компонента
export function getContainerStyle(
  isCompleted: boolean,
  inProgress: boolean,
  edit: boolean
) {
  return !isCompleted
    ? !inProgress
      ? !edit
        ? styles.task
        : styles.task + ' ' + styles.taskEdit
      : !edit
      ? styles.task + ' ' + styles.taskInProgress
      : styles.task + ' ' + styles.taskInProgress + ' ' + styles.taskEdit
    : !edit
    ? styles.task + ' ' + styles.taskIsCompleted
    : styles.task + ' ' + styles.taskIsCompleted + ' ' + styles.taskEdit
}

export function getTaskNameStyle(isCompleted: boolean, inProgress: boolean) {
  return !isCompleted
    ? !inProgress
      ? styles.taskName
      : styles.taskName + ' ' + styles.taskNameInProgress
    : styles.taskName + ' ' + styles.taskNameIsCompleted
}

export function getTaskDescrStyle(isCompleted: boolean, inProgress: boolean) {
  return !isCompleted
    ? !inProgress
      ? styles.taskDescr
      : styles.taskDescr + ' ' + styles.taskDescrInProgress
    : styles.taskDescr + ' ' + styles.taskDescrIsCompleted
}
