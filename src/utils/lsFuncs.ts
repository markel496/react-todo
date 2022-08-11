import { ITask } from '../models'

//Получение списка задач из localStorage
export const getTasksFromLS = (): ITask[] =>
  JSON.parse(localStorage.getItem('tasks')!)

//Сохранение списка задач в localStorage
export const saveTasksInLS = (itemToSave: ITask[]) => {
  const json = JSON.stringify(itemToSave)
  localStorage.setItem('tasks', json)
}
