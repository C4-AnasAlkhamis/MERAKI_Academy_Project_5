import { Link } from "react-router-dom";

import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  return (
    <>
      <div className="NavBar">
        {isLoggedIn ? (
          <>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              Cart
            </Link>
            <Link to="/wishlist" style={{ textDecoration: "none" }}>
              Wishlist
            </Link>
            <Link to="/more-info" style={{ textDecoration: "none" }}>
              I
            </Link>

            <Link
              to="/homePage"
              className="logout"
              onClick={(e) => {
                logOut();
                localStorage.setItem("token", "");
              }}
            >
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
      </div>
    </>
  );
};

export default NavBar;
