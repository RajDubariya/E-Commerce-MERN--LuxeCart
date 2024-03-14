import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  singleProduct: null,
  suggestedProducts: [],
  similarProducts: [],
  sellerProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSuggestedProducts: (state, action) => {
      state.suggestedProducts = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setSimilarProducts: (state, action) => {
      state.similarProducts = action.payload;
    },
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
  },
});

export const {
  setProducts,
  setSuggestedProducts,
  setSingleProduct,
  setSimilarProducts,
  setSellerProducts,
} = productSlice.actions;

export default productSlice.reducer;
