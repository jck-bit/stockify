import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Products from './widgets/Products';
import Navbar from './navbar';
import { SnackbarProvider } from "notistack";
import LoginPage from './login';
import SalesTable from './widgets/Sales';
import Register from './login/register';
import PrivacyPolicy from './components/private_policy';
import Profile from './profile';
import UserProfileUpdate from './profile/UserProfileUpdate';
import OnlineStore from './widgets/store';
import CheckoutCart from "./checkout";
import AppNavbar from "./navbar";

function App() {
  const isAuth = Boolean(useSelector((state:any) => state.token))

  return (
    <>
      
      <SnackbarProvider 
        anchorOrigin={{
         vertical: "bottom",
         horizontal: "left",
       }}
      >
    <BrowserRouter>
      {/* <Navbar/> */}
      <AppNavbar/>
      
        <Routes>
          {/* <Route path='/' element={ isAuth ? <HomePage/> : <Navigate to="/login" />}/> */}
           <Route path='/' element={isAuth ? <Products/> : <Navigate to="/login" />}/>
           <Route path='/stocks' element={isAuth ? <OnlineStore/> : <Navigate to="/login" />}/>
          {/* <Route path='/stocks' element={isAuth ? <OnlineStore/> : <Navigate to="/login" />}/>
          <Route path='/sales' element={ isAuth ? <SalesTable/> : <Navigate to="/login" />}/>
          <Route path='/profile' element={isAuth ? <Profile/> :<Navigate to="/login" />}/>
          <Route path='/profile/profile-change' element={ isAuth ? <UserProfileUpdate/> :<Navigate to="/login" />}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/privacy_policy' element={<PrivacyPolicy/>}/>
          <Route path='/cart_modal' element={<CheckoutCart/>}/>  */}
        </Routes>
      </BrowserRouter>
    
      </SnackbarProvider>
    </>
  )
}

export default App
