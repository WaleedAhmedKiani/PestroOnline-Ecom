import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    PreviousURL: '',

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    ADD_TO_CART(state, action){
        console.log(action.payload);
      const productIndex = state.cartItems.findIndex((item)=>
      item.id === action.payload.id);

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} Product Quantity Increased`,
        {position: 'top-left'});

      }else{
        const tproduct = {...action.payload, cartQuantity: 1}
        state.cartItems.push(tproduct);
        toast.success(`${action.payload.name} added to cart`,
        {position: 'top-left'});
      }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    DECREASE_CART(state, action){
      // console.log(action.payload)
      const productIndex = state.cartItems.findIndex((item)=>
      item.id === action.payload.id);

      if(state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} Product Quantity Decreased`,
        {position: 'top-left'});

      }
      else if(state.cartItems[productIndex].cartQuantity === 1){
        const newCartItem = state.cartItems.filter((item)=>
          item.id !== action.payload.id);
        toast.success(`${action.payload.name} remove from cart`,
        {position: 'top-left'});
        state.cartItems = newCartItem;
      
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    REMOVE_ITEMS_CART(state, action){
      const newCartItem = state.cartItems.filter((item)=>
      item.id !== action.payload.id);
      toast.success(`${action.payload.name} remove from cart`,
      {position: 'top-left'});
      state.cartItems = newCartItem;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

    },
    CLEAR_CART(state, action){
      state.cartItems = []
      toast.success(`Cart is Cleared`,
      {position: 'top-left'});
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

    },

    CALCULATE_TOTAL(state, action){
      const array = []
      state.cartItems.map((item)=>{
        const{price, cartQuantity} = item;
        const cartItemsAmount = price * cartQuantity;
        return array.push(cartItemsAmount);
      });
      const TotalAmount = array.reduce((a, b) =>{
        return a + b;
      },0);
      state.cartTotalAmount = TotalAmount;
    },

    CALCULATE_TOTAL_QUANTITY(state, action){
      const array = []
      state.cartItems.map((item)=>{
        const{cartQuantity} = item;
        const Quantity =  cartQuantity;
        return array.push(Quantity);
      });
      const TotalQuantity = array.reduce((a, b) =>{
        return a + b;
      },0);
      state.cartTotalQuantity = TotalQuantity;
    },
     SAVE_URL(state, action){
      state.PreviousURL = action.payload;

     }
  },
});

export const {ADD_TO_CART,DECREASE_CART,REMOVE_ITEMS_CART,CLEAR_CART,CALCULATE_TOTAL,CALCULATE_TOTAL_QUANTITY,SAVE_URL} = cartSlice.actions
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.PreviousURL;

export default cartSlice.reducer