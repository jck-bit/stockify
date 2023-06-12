import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, CartItem,Product } from "../types";

const  storedUser = localStorage.getItem("user");
const  storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  products: [],
  sales: [], 
  cart: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state:any, action: PayloadAction<{ user:string, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      //store the user data in the local storage

      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    setLogout: (state:any) => {
      state.user = null;
      state.token = null;

      localStorage.clear()
    },
    setProducts: (
      state,
      action: PayloadAction<{ products: Product | any }>
    ) => {
      state.products = action.payload.products; 
    },
    
    addProduct:(state, action:PayloadAction<{ product: Product }>) =>{
      state.products.push(action.payload.product)
      console.log(state.products)
      return state;
    },

    DeleteProduct: (state, action: PayloadAction<{ id: number }>) => {
      const removeItem =  state.products.filter((item:any) => item.id !== action.payload)
      state.products = removeItem

    },

    EditProduct: (state, action: PayloadAction<{ product: any }>) => {
      const { product } = action.payload;
      const index = state.products.findIndex((item: Product) => item.id === product.id);
    
      if (index !== -1) {
        state.products[index] = product;
        console.log("Item updated:", product);
      } else {
        console.log("Item not found in state.products");
      }

      return state;
    },
    

    setSales: (state, action: PayloadAction<{ sales: any[] }>) => {
      state.sales = action.payload.sales;
    },

    setCart: (state, action: PayloadAction<{ cart: CartItem[] }>) => {
      state.cart = action.payload.cart;
    },

    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
    
      const existingCartItem = state.cart.find((item) => item && item.id === product.id);
      
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    }, 
      deleteCart:(state, action:PayloadAction)=>{
        state.cart =[];
      },

      deleteOneProduct:(state:any, action:any) =>{
        const removeItem =  state.cart.filter((item:any) => item.id !== action.payload)
        state.cart = removeItem;

      },
  },
});

export const {
  setLogin,
  addToCart,
  setProducts,
  DeleteProduct,
  EditProduct,
  setCart,
  deleteOneProduct,
  setSales,
  deleteCart,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
export type Rootstate = ReturnType<typeof authSlice.reducer>;
