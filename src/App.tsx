import { FC, useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchProducts } from './store/reducers/action-creators';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const {products, isLoading, error} = useAppSelector(state => state.productReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(products, null, 2)}
    </div>
  );
}

export { App };
