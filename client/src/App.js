/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NavBar from "./components/navBar/navBar";
import Cart from "./components/cart/cart";
import Wishlist from "./components/wishlist/wishlist";
// import AddItem from "./components/addItem/addItem";
import HomePage from "./components/homePage/homePage";
// import Pag from "./components/cart/test";
import AdminPanel from "./components/adminPanel/adminPanel";
import logo from "./image/logo.png";
// import Category from "./components/adminPanel/categories/Caregories";
import Worker from "./components/createWorker/CreateWorker";

import AddItem from "./components/adminPanel/items/addItem/addItem";

import Dashboard from "./components/adminPanel/dashboard/dashboard";
import AddCategory from "./components/adminPanel/categories/Caregories";
import ShowItems from "./components/adminPanel/items/showItems/showItems";
import AddService from "./components/adminPanel/services/AddService";
import MainPage from "./components/mainPage/mainPage";
// import ShowServices  from "./components/adminPanel/services/showServices/showServices";
import ShowUsers from "./components/adminPanel/users/showUsers/showUsers";
import { useState } from "react";

// import AddService from "./components/addService/AddService";
import ServicePage from "./components/servicePage/ServicePage";
import Profile from "./components/profile/Profile";
import FeedBack from "./components/feedback/Feedback";
import Footer from "./components/footer/footer";

import ShowWorkers from "./components/adminPanel/users/showWorkers/showWorkers";
import Rate from "./components/rate/Rate";
import Chat from "./components/chat/Chat";

function App() {
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  let isAdmin = localStorage.getItem("isAdmin") ? true : false;
  return (
    <div className="App">
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          {" "}
          <div className="logo">
            <img src={logo} />
          </div>
          <NavBar />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />7
        <Route path="/register" element={<Register />} />
        {/* <Route path="/more-info" element={<ItemInfo />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route
          path="/homePage"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/service"
          element={
            <>
              <ServicePage />
            </>
          }
        />
        <Route path="/" element={<MainPage />} />
        <Route path="/add-your-service" element={<Worker />} />
        <Route path="/profiles" element={<Profile />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/addItems" element={<AddItem />} />
        <Route path="/showItems" element={<ShowItems />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/showUsers" element={<ShowUsers />} />
        <Route path="/showWorkers" element={<ShowWorkers />} />
        <Route path="/feedBack" element={<FeedBack />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {isLoggedIn ? <Chat /> : null}
      <div>
        <>{/* <FeedBack /> */}</>
      </div>
      {!isAdmin ? <Footer /> : null}
    </div>
  );
}

export default App;
