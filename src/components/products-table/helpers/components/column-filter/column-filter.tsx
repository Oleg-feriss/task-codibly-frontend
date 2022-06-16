import { Renderer, FilterProps } from 'react-table';

const ColumnFilter: Renderer<FilterProps<object>> = ({ column }) => {
  const { filterValue, setFilter, } = column;

  return (
    <span>
      <input 
        type="number" 
        value={filterValue || ''} 
        onChange={(event) => setFilter(event.target.value)} 
      />
    </span>
  )
}

export { ColumnFilter };