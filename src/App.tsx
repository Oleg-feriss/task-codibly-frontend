import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductsTable } from './components/products-table/products-table';

const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<ProductsTable />} />
    </Routes>
  );
}

export { App };
