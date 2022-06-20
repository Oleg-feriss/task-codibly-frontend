import { Column } from 'react-table';
import { ProductsTableHeader, ProductsTableAccessor } from '../../../common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: ProductsTableHeader.ID,
      accessor: ProductsTableAccessor.ID,
      disableFilters: false,
    },
    {
      Header: ProductsTableHeader.PRODUCT_NAME,
      accessor: ProductsTableAccessor.PRODUCT_NAME,
    },
    {
      Header: ProductsTableHeader.YEAR,
      accessor: ProductsTableAccessor.YEAR,
    },
  ];
};

export { getColumns };
