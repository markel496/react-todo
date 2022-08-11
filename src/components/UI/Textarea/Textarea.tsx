import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import styles from './Textarea.module.scss'
import closeIcon from '../../../img/close_icon.svg'

type TProps = {
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

const Textarea = ({ value, onChange }: TProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const changeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const clearTextarea = () => {
    onChange('')
    textareaRef.current!.focus()
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
        placeholder="Описание (не обязательно)..."
        onChange={(e) => changeTextarea(e)}
      />
    </div>
  )
}

export default Textarea
