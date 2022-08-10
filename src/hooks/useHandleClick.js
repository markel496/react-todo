import { useEffect } from 'react'

//Хук, изменяющий состояние isValid в компонентах CreateTask и Task.
export function useHandleClick(value, setValue, buttonRef) {
  useEffect(() => {
    const handleClick = (event) => {
      setValue(!event.path.includes(buttonRef.current) ? true : false)
      console.log('click')
    }

    value
      ? document.removeEventListener('click', handleClick)
      : document.addEventListener('click', handleClick)

    //отрабатывает, когда компнент будет уничтожаться
    return () => document.removeEventListener('click', handleClick)
  }, [value])
}
