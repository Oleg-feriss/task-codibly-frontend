import { Column } from 'react-table';
import { ProductsTableHeader, ProductsTableAccessor } from '../../../common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: ProductsTableHeader.ID,
      accessor: ProductsTableAccessor.ID,
      minWidth: 100,
      width: 400,
      disableFilters: false,
    },
    {
      Header: ProductsTableHeader.PRODUCT_NAME,
      accessor: ProductsTableAccessor.PRODUCT_NAME,
      minWidth: 100,
      width: 400,
    },
    {
      Header: ProductsTableHeader.YEAR,
      accessor: ProductsTableAccessor.YEAR,
      minWidth: 120,
      width: 200,
    },
  ];
};

export { getColumns };
