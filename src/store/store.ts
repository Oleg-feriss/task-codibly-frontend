import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product-slice";

const rootReducer = combineReducers({
  productReducer
})

const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export { setupStore, type RootState, type AppStore, type AppDispatch };