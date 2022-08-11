import { Dispatch, SetStateAction, useEffect } from 'react'

//Хук, изменяющий состояние isValid в компонентах CreateTask и Task.
export function useHandleClick(
  value: boolean,
  setValue: Dispatch<SetStateAction<boolean>>,
  buttonRef: React.RefObject<HTMLButtonElement>
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setValue(
        !event.composedPath().includes(buttonRef.current!) ? true : false
      )
      console.log('click')
    }

    value
      ? document.removeEventListener('click', handleClick)
      : document.addEventListener('click', handleClick)

    //отрабатывает, когда компнент будет уничтожаться
    return () => document.removeEventListener('click', handleClick)
  }, [value])
}
