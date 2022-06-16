import { FC } from 'react';
import { useTable, Column, useFilters } from 'react-table';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
  defaultColumn?: any;
  placeholder?: string;
  isLoading?: boolean;
}

const Table: FC<Props> = ({
  columns,
  data,
  defaultColumn,
  placeholder,
  isLoading,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: columns as Column<Record<string, string>>[],
      data: data as Record<string, string>[],
      defaultColumn: defaultColumn as Partial<Column<Record<string, string>>> | undefined,
    },
    useFilters,
  );

  const hasStrPlaceholder = Boolean(placeholder);
  const hasData = Boolean(data.length);
  const hasPlaceholder = hasStrPlaceholder && !hasData;
  
  return(
    <div
      className={styles.tableWrapper}
    >
      <div className={styles.tableContainer}>
        {isLoading ? (
          // <Loader />
          <h1>Loading...</h1>
        ) : (
          <table {...getTableProps()} className={styles.clientSideTable}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                className={styles.tableHeaderRow}
                {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                    {...column.getHeaderProps()}
                    className={styles.tableHeaderCell}
                    >
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr className={styles.tableRow} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{background: row.original.color}}
                          className={styles.tableCell}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {hasPlaceholder && !isLoading && (
          <div className={styles.placeholder}>{placeholder}</div>
        )}
      </div>
    </div>  
  );
};

export { Table };