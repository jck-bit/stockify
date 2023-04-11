import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, CartItem,Product } from "../types";

const initialState: AuthState = {
  user: null,
  token: null,
  products: [],
  sales: [],
  cart: [],
};

export const authSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setProducts: (
      state,
      action: PayloadAction<{ products: Product[] }>
    ) => {
      state.products = action.payload.products;
      console.log(`${state.products.map((product) =>{
        console.log(product.id)
      })}`)      
    },
    setSales: (state, action: PayloadAction<{ sales: any[] }>) => {
      state.sales = action.payload.sales;
    },

    setCart: (state, action: PayloadAction<{ cart: CartItem[] }>) => {
      state.cart = action.payload.cart;
    },

    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
    
      console.log(state.cart)
      const existingCartItem = state.cart.find((item) => item && item.id === product.id);
      
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    }, 
      deleteCart:(state, action:PayloadAction)=>{
        state.cart =[]
      },

      deleteOneProduct:(state:any, action:any) =>{
        const removeItem =  state.cart.filter((item:any) => item.id !== action.payload)
        state.cart = removeItem

      },
  },
});

export const {
  setLogin,
  addToCart,
  setProducts,
  setCart,
  deleteOneProduct,
  setSales,
  deleteCart,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
export type Rootstate = ReturnType<typeof authSlice.reducer>;
