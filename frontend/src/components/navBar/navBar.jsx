/** @format */
import jwt from "jwt-decode";
import { Link } from "react-router-dom";
import "./navbar.css";
import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";
//
import { GrUserWorker } from "react-icons/gr";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FcServices } from "react-icons/fc";
//
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
const popupLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
    // title: 'Custom width, padding, color, background.',
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Logout!", "You have been logged out !.", "success");
    }
  });
};
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
          <h2>
            {isLoggedIn ? (
              <>
                {/* <Link to="/paginate" style={{ textDecoration: "none" }}>
                   pag
                </Link> */}
                <Link to="/homePage" style={{ textDecoration: "none" }}>
                  <AiOutlineFundProjectionScreen /> HOME
                </Link>

                {/* <Link to="/feedback" style={{ textDecoration: "none" }}>FEEDBACK
                </Link> */}

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
            {/* <Link to="/adminPanel" style={{ textDecoration: "none" }}>
              ADMIN
            </Link> */}
          </h2>
        </div>
      </div>
    </>
  );
};

export default NavBar;
