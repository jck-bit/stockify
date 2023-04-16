export interface Product {
    id: number | any
    name: string;
    price: number;
    quantity: number;
    date_added:Date
  }

export interface CartItem {
    id: number;
    quantity: any;
    price:any
    name:any
    date_added:Date
  }
   
export interface AuthState {
    user: null | any;
    token: null | string;
    products: Product[];
    sales: any[];
    cart: CartItem[];
  }