import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterProducts : [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SEARCH_FILTER(state, action){
      const{products, search} = action.payload
      const tproduct = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())
       || product.category.toLowerCase().includes(search.toLowerCase()))

      state.filterProducts = tproduct;
    },
    PRODUCTS_SORT(state, action){
      // console.log(action.payload)
      const{products, sort} = action.payload
      let tproduct = []

      if(sort === 'latest'){
        tproduct = products;
      }

      if(sort === 'lowest-price'){
        tproduct = products.slice().sort((a, b)=> {
          return a.price - b.price;
        });
      }

      if(sort === 'highest-price'){
        tproduct = products.slice().sort((a, b)=> {
          return b.price - a.price;
        });
      }

      if(sort === 'a-z'){
        tproduct = products.slice().sort((a, b)=> {
          return a.name.localeCompare(b.name)
        });
         }
         
        if(sort === 'z-a'){
          tproduct = products.slice().sort((a, b)=> {
            return b.name.localeCompare(a.name)
          });
        }
      

      state.filterProducts = tproduct;

    },
    FILTER_BY_CATEGORY(state, action) {
      // console.log(action.payload);
      const {products, category} = action.payload
      let tproduct = []
      if(category === 'All'){
        tproduct = products
      } else{
        tproduct = products.filter((product) => product.category === category);
      }

      state.filterProducts = tproduct;
    },

    FILTER_BY_BRAND(state, action) {
      // console.log(action.payload);
      const {products, brand} = action.payload
      let tproduct = []
      if(brand === 'All'){
        tproduct = products
      } else{
        tproduct = products.filter((product) => product.brand === brand);
      }

      state.filterProducts = tproduct;
    },

    FILTER_BY_PRICE(state, action) {
      // console.log(action.payload)
      const {products, price} = action.payload
      let tproduct = []
      tproduct = products.filter((product) => product.price <= price);

      state.filterProducts = tproduct;

    },

  
    
  },
 
});

export const {SEARCH_FILTER, PRODUCTS_SORT, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE} = filterSlice.actions
export const selectFilterProducts = (state) => state.filter.filterProducts

export default filterSlice.reducer
