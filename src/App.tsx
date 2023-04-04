import './App.css'
import HomePage from './homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './widgets/Products';
import Cart from './widgets/Cart';
import Navbar from './navbar';
import { SnackbarProvider } from "notistack";
import LoginPage from './login';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <SnackbarProvider 
        anchorOrigin={{
         vertical: "bottom",
         horizontal: "left",
       }}
      >
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
