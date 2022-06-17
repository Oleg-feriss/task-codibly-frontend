import {
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
} from 'react-table';

declare module 'react-table' {
  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {
    align?: string
  }

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseFlexLayoutColumnProps<D>,
      UseSortByColumnProps<D> {}

  export interface TableOptions<D extends Record<string, unknown>>
    extends UsePaginationOptions<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderState<D>,
      UsePaginationState<D> {
    rowCount: number
  }

  export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseColumnOrderInstanceProps<D>,
      UsePaginationInstanceProps<D> {}
}
