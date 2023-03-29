import './App.css'
import HomePage from './homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './widgets/Products';
import Cart from './widgets/Cart';
import Navbar from './navbar';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
