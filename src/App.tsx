import './App.css'
import HomePage from './homepage'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Products from './widgets/Products';
import Cart from './widgets/Cart';
import Navbar from './navbar';
import { SnackbarProvider } from "notistack";
import LoginPage from './login';
import SalesTable from './widgets/Sales';
import Register from './login/register';
import PrivacyPolicy from './components/private_policy';

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
          <Route path='/' element={ isAuth ? <HomePage/> : <Navigate to="/login" />}/>
          <Route path='/products' element={isAuth ? <Products/> : <Navigate to="/login" />}/>
          <Route path='/cart' element={ isAuth ? <Cart/> : <Navigate to="/login" />}/>
          <Route path='/sales' element={ isAuth ? <SalesTable/> : <Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/privacy_policy' element={<PrivacyPolicy/>}/>
        </Routes>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App