/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ItemInfo from "./components/ItemInfo/ItemInfo";
import Register from "./components/register/Register";
import NavBar from "./components/navBar/navBar";
import Cart from "./components/cart/cart";
import Wishlist from "./components/wishlist/wishlist";
// import AddItem from "./components/addItem/addItem";
import HomePage from "./components/homePage/homePage";
// import Pag from "./components/cart/test";
import AdminPanel from "./components/adminPanel/adminPanel";
import logo from "./image/logo.png";
import Category from "./components/adminPanel/categories/Caregories";

import AddItem from "./components/adminPanel/items/addItem/addItem";

function App() {
  return (
    <div className="App">
      <div className="logo">
        <img src={logo} />
      </div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />7
        <Route path="/addCategory" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/more-info" element={<ItemInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        {/* <Route path="/addItem" element={<AddItem />} /> */}
        <Route path="/homePage" element={<HomePage />} />
        {/* <Route path="/paginate" element={<Pag />} /> */}
        {/* <Route path="/paginate" element={<Pag />} /> */}
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="addItems" element={<AddItem />} />



      </Routes>
    </div>
  );
}

export default App;
