import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Renderer, FilterProps } from 'react-table';
import styles from './styles.module.scss'

const ColumnFilter: Renderer<FilterProps<object>> = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('id') || '';
  const hasFilterValue = Boolean(filterValue);
  const hasSearchQuery = Boolean(searchQuery);
  
  useEffect(() => {
    if(!hasFilterValue && hasSearchQuery) {
      setFilter(searchQuery);
    }
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    
    setFilter(searchValue);
    setSearchParams({
      id: searchValue,
      page: searchParams.get('page') as string,
    });
  }
  
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
        value={searchQuery} 
        onChange={handleOnChange} 
        className={styles.searchId}
        placeholder="Search"
        onKeyDown={handleKeypress}
      />
    </span>
  )
}

export { ColumnFilter };