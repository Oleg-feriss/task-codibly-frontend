import { FC } from 'react';
import { useTable, Column, useFilters, usePagination } from 'react-table';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
  defaultColumn?: any;
  placeholder?: string;
  isLoading?: boolean;
  pagination?: {
    countItems: number;
  };
}

const Table: FC<Props> = ({
  columns,
  data,
  defaultColumn,
  placeholder,
  isLoading,
  pagination,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable(
    {
      columns: columns as Column<Record<string, string>>[],
      data: data as Record<string, string>[],
      defaultColumn: defaultColumn as Partial<Column<Record<string, string>>> | undefined,
      initialState: { pageSize: pagination?.countItems },
      autoResetPage: false,
    },
    useFilters,
    usePagination,
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
              {page.map((row) => {
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
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    </div>  
  );
};

export { Table };