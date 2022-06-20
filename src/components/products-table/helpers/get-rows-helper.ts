import { ProductsTableAccessor } from '../../../common/enums/enums';
import { IProduct } from '../../../models/IProduct';

type Row = {
  [ProductsTableAccessor.ID]: number;
  [ProductsTableAccessor.PRODUCT_NAME]: string;
  [ProductsTableAccessor.YEAR]: number;
};

const getRows = (products: IProduct['data']): Row[] => {
  return products.map((item) => {
    const { id, name, year, color } = item;

    return {
      [ProductsTableAccessor.ID]: id,
      [ProductsTableAccessor.PRODUCT_NAME]: name,
      [ProductsTableAccessor.YEAR]: year,
      [ProductsTableAccessor.COLOR]: color,
    };
  });
};

export { getRows };
