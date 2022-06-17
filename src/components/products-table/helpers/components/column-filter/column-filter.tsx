import React from 'react';
import { Renderer, FilterProps } from 'react-table';
import styles from './styles.module.scss'

const ColumnFilter: Renderer<FilterProps<object>> = ({ column }) => {
  const { filterValue, setFilter, } = column;

  const handleKeypress = (event: React.KeyboardEvent<HTMLDivElement>): void=> {
    const characterCode = event.key
    if (characterCode === 'Backspace') return

    const element = event.currentTarget as HTMLInputElement;

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (element.value && element.value.length) {
        return
      } else if (characterNumber === 0) {
        event.preventDefault()
      }
    } else {
      event.preventDefault()
    }
  }

  return (
    <span>
      <input 
        type="number" 
        value={filterValue || ''} 
        onChange={(event) => setFilter(event.target.value)} 
        className={styles.searchId}
        placeholder="Search"
        onKeyDown={handleKeypress}
      />
    </span>
  )
}

export { ColumnFilter };