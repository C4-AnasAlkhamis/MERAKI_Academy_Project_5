/** @format */

import { Link } from "react-router-dom";
import "./navbar.css";
import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
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
                HOME
              </Link>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                CART
              </Link>
              <Link to="/wishlist" style={{ textDecoration: "none" }}>
                WISHLIST
              </Link>

              <Link
                to="/homePage"
                className="logout"
                onClick={(e) => {
                  logOut();
                  localStorage.setItem("token", "");
                }}>
                logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register{" "}
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
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
