import './App.css';
import './assets/style.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './frontend/Home';
import Shop from './frontend/Shop';
import Header from './frontend/includes/Header';
import Login from './frontend/Login';
import Registration from './frontend/Registration';
import CartList from './frontend/CartList';
import Checkout from './frontend/Checkout';
import OrderSuccessMassage from './frontend/OrderSuccessMassage';
import Logout from './frontend/Logout';
import './App.css';

// import CartList from './frontend/CartList';

function App() {
  const [cart, setCart] = useState(0);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId =  user ? user.id : '';
  
  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId =  user ? user.id : '';
  }
  useEffect( ()=>{
    cartItems();
  },[]);

  async function cartItems(){
    let result =await fetch('http://127.0.0.1:8000/api/cartitem/'+userId);
    result= await result.json();
    setCart(result);
  }

  function emptyCart(){
    setCart(0);
  }
  
  return (
    <BrowserRouter> {}
      <Header items={cart} />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          
            <Route path="/cartlist" element={<CartList cartItem={cartItems}/>} />
            <Route path="/login" element={<Login cartItem={cartItems} userUpdate={userUpdate} />} />
            <Route path="/register" element={<Registration />} />
            
            <Route path="/checkout" element={<Checkout cartItem={cartItems} />} />
            <Route path="/massage" element={<OrderSuccessMassage />} />
          
            <Route path="/logout" element={<Logout emptyCart={emptyCart} />} />
          </Route>
        </Routes>

    </BrowserRouter>
  );
}
export default App;
