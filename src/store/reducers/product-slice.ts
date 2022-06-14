import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct"
import { fetchProducts } from "./action-creators";

interface ProductState {
  products?: IProduct;
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  isLoading: false,
  error: '',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action: PayloadAction<IProduct>) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
    },
  }
})

export default productSlice.reducer;