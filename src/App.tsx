import './App.css'
import HomePage from './homepage'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Products from './widgets/Products';
import Cart from './widgets/Cart';
import Navbar from './navbar';
import { SnackbarProvider } from "notistack";
import LoginPage from './login';

function App() {
  const isAuth = Boolean(useSelector((state:any) => state.token))
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
          <Route path='/products' element={isAuth ? <Products/> : <Navigate to="/login" />}/>
          <Route path='/cart' element={ isAuth ? <Cart/> : <Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App