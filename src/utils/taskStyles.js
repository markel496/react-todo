import styles from '../components/Task/Task.module.scss'

//Функции возвращают нужные стили в зависимости от состояния компонента
export function getContainerStyle(isCompleted, inProgress, edit) {
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

export function getTaskNameStyle(isCompleted, inProgress) {
  return !isCompleted
    ? !inProgress
      ? styles.taskName
      : styles.taskName + ' ' + styles.taskNameInProgress
    : styles.taskName + ' ' + styles.taskNameIsCompleted
}

export function getTaskDescrStyle(isCompleted, inProgress) {
  return !isCompleted
    ? !inProgress
      ? styles.taskDescr
      : styles.taskDescr + ' ' + styles.taskDescrInProgress
    : styles.taskDescr + ' ' + styles.taskDescrIsCompleted
}
