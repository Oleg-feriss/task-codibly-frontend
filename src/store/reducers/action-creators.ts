import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../models/IProduct";

const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (_, thunkAPI) => {
    const response = await axios.get<IProduct>('https://reqres.in/api/products')
    return response.data;
  }
)

export { fetchProducts };