//Получение списка задач из localStorage
export const getTasksFromLS = () => JSON.parse(localStorage.getItem('tasks'))

//Сохранение списка задач в localStorage
export const saveTasksInLS = (itemToSave) => {
  const json = JSON.stringify(itemToSave)
  localStorage.setItem('tasks', json)
}
