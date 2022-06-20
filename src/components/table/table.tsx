import { FC, useEffect } from 'react';
import { useTable, Column, useFilters, usePagination } from 'react-table';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../loader/loader';
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
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
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

  const [searchParams, setSearchParams] = useSearchParams();

  const { pageIndex } = state;
  const searchQuery = searchParams.get('page') || '';

  const hasStrPlaceholder = Boolean(placeholder);
  const hasData = Boolean(data.length);
  const hasPlaceholder = hasStrPlaceholder && !hasData;
  const hasPagination = Boolean(pagination);
  const hasSearchQuery = Boolean(searchQuery); 
  const currentPage = pageIndex + 1;
  
  const queryParams = {
    id: '',
    page: '',
  };

  useEffect(() => {
    if (hasPagination && !hasSearchQuery) {
      queryParams.page = currentPage.toString();
      setSearchParams(queryParams);
    }
      
    if (currentPage !== +searchQuery) {
      gotoPage(currentPage);
    };
  });

  return(
    <div
      className={styles.tableWrapper}
    >
      <div className={styles.tableContainer}>
        {isLoading ? (
          <Loader />
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
        {pagination && (
        <div className={styles.paginationBtns}>
          <button 
            onClick={() => {
              previousPage();
              queryParams.id = searchParams.get('id') as string;
              queryParams.page = pageIndex.toString();
              setSearchParams(queryParams);
            }} 
            disabled={!canPreviousPage} 
            className={styles.paginationBtn}>
              {'<<'}
          </button>
          <span className={styles.pageCounter}>
            {pageIndex + 1} of {pageOptions.length}
          </span>
          <button 
            onClick={() => {
              nextPage();
              queryParams.id = searchParams.get('id') as string;
              queryParams.page = (pageIndex + 2).toString();
              setSearchParams(queryParams);
            }} 
            disabled={!canNextPage} 
            className={styles.paginationBtn}>
              {'>>'}
          </button>
        </div>
        )}
    </div>  
  );
};

export { Table };