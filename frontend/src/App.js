import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import ItemInfo from "./components/ItemInfo/ItemInfo";
import Register from "./components/register/Register";
import NavBar from "./components/navBar/navBar";
import Cart from "./components/cart/cart";
import Wishlist from "./components/wishlist/wishlist";

function App() {
  return (
    <div className="App">
      
      <NavBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/more-info" element={<ItemInfo />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
