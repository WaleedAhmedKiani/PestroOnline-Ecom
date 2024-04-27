import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minprice: null,
    maxprice: null,

}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
        // console.log(action.payload);
        state.products = action.payload.products;

    },

    GET_PRICE_RANGE(state, action){
      // console.log(action.payload)
      const {products} = action.payload
      const array = []
      products.map((product) => {
        const price = product.price
        return array.push(price)
      })
      const max = Math.max(...array)
      const min = Math.min(...array)
      
      state.minprice = min;
      state.maxprice = max;


    },
  }
});


export const {STORE_PRODUCTS, GET_PRICE_RANGE} = productSlice.actions
export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minprice;
export const selectMaxPrice = (state) => state.product.maxprice;

export default productSlice.reducer