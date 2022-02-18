import jwt from "jwt-decode";
import { Link } from "react-router-dom";
import "./navbar.css";
import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";
import { GrUserWorker } from "react-icons/gr";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FcServices } from "react-icons/fc";
const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  return (
    <>
      <div className="NavBar">
        <div className="Link">
          {/* <h2> */}
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
                <Link to="/service" style={{ textDecoration: "none" }}>
                  <FcServices /> SERVICES
                </Link>
                {token && jwt(token).role === 3 ? (
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <GrUserWorker /> PROFILE
                  </Link>
                ) : (
                  <Link
                    to="/add-your-service"
                    style={{ textDecoration: "none" }}
                  >
                    <GrUserWorker /> JOIN US
                  </Link>
                )}
                <a
                  href="/homePage"
                  onClick={(e) => {
                    dispatch(logOut());
                    localStorage.clear();
                  }}
                  className="logout"
                >
                  <BiLogOut /> LOGOUT
                </a>
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
          {/* </h2> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
