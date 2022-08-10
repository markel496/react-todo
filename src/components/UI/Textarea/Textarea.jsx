import React, { useRef } from 'react'
import styles from './Textarea.module.scss'
import closeIcon from '../../../img/close_icon.svg'

const Textarea = ({ value, onChange }) => {
  const textareaRef = useRef(null)

  const changeTextarea = (event) => {
    onChange(event.target.value)
  }

  const clearTextarea = () => {
    onChange('')
    textareaRef.current.focus()
  }

  return (
    <div className={styles.textareaContainer}>
      {value !== '' && (
        <img
          className={styles.closeIconTextarea}
          src={closeIcon}
          alt="закрыть"
          onClick={clearTextarea}
        />
      )}
      <textarea
        wrap="soft"
        ref={textareaRef}
        value={value}
        className={styles.textareaDescr}
        type="text"
        placeholder="Описание (не обязательно)..."
        onChange={(e) => changeTextarea(e)}
      />
    </div>
  )
}

export default Textarea
