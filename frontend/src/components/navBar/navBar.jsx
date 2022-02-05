/** @format */

import { Link } from "react-router-dom";
import "./navbar.css";
import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";

//
import { GrUser } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUserAdd
} from "react-icons/ai";
//
const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  return (
    <>
      <div className="NavBar">
        <div className="Link">
          <h2>
            {isLoggedIn ? (
              <>
                <Link to="/homePage" style={{ textDecoration: "none" }}>
                  <AiOutlineFundProjectionScreen /> HOME
                </Link>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <AiOutlineShoppingCart /> CART
                </Link>
                <Link to="/wishlist" style={{ textDecoration: "none" }}>
                  <AiOutlineOrderedList /> WISHLIST
                </Link>

                <Link
                  to="/homePage"
                  className="logout"
                  onClick={(e) => {
                    dispatch(logOut());
                    localStorage.setItem("token", "");
                  }}
                >
                  <BiLogOut /> LOGOUT
                </Link>
              </>
            ) : (
              <>
                <Link to="/homePage" style={{ textDecoration: "none" }}>
                  <AiOutlineFundProjectionScreen /> HOME
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <AiOutlineUserAdd /> REGISTER{" "}
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <BiLogIn /> LOGIN
                </Link>
              </>
            )}
          </h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;
