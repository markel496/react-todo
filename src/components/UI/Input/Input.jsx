import React, { useRef } from 'react'
import styles from './Input.module.scss'
import closeIcon from '../../../img/close_icon.svg'

const Input = ({ value, onChange, valid, setIsValid }) => {
  const inputRef = useRef(null) //для фокуса

  //Изменяю состояние value
  const changeInput = (event) => {
    onChange(event.target.value)
    setIsValid(true)
  }

  const clearInput = () => {
    onChange('')
    inputRef.current.focus() // Фокус на инпут после того, как нажали на крестик
  }

  return (
    <div className={styles.inputContainer}>
      {value !== '' && (
        <img
          className={styles.closeIconInput}
          src={closeIcon}
          alt="закрыть"
          onClick={clearInput}
        />
      )}
      <input
        ref={inputRef}
        value={value}
        className={
          valid ? styles.inputName : styles.inputName + ' ' + styles.error
        }
        type="text"
        placeholder="Введите название..."
        onChange={(e) => changeInput(e)}
      />
    </div>
  )
}

export default Input
