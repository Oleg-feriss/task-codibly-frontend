import { useEffect, useMemo, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProducts } from '../../store/reducers/action-creators';
import { Table } from '../table/table';
import { getColumns, getRows } from './helpers/helpers';
import { ColumnFilter } from './helpers/components/components/components';

const ProductsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(state => state.productReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => getRows(products), [products]);
  const defaultColumn = useMemo(() => {
    return { 
      Filter: ColumnFilter,
      disableFilters: true,
    } 
  }, []);

  return (
    <Table 
      columns={columns}
      data={data}
      defaultColumn={defaultColumn}
      placeholder='No data to display'
      isLoading={isLoading}
    />
  );
}

export { ProductsTable };