export interface Product {
    id: number | any
    name: string;
    price: number;
    quantity: number;
    date_added:any;
    description: string;
    product_pic:string
  }

export interface Sale {
    id: number;
    product: number;
    date:number
    user: number;
    total_sale:number;  
  }

export interface CartItem {
    id: number;
    quantity: any;
    price:any
    name:any
    image:string
    description:string
    product_pic:string
    date_added?:any;
  }
   
export interface AuthState {
    user: null | any;
    token: null | string;
    products: Product[];
    sales: any[];
    cart: CartItem[];
  }