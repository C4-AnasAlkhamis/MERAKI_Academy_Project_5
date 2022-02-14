/** @format */

// /** @format */

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
/////////////////
import { GrUserWorker } from "react-icons/gr";
import { BiLogOut, BiLogIn } from "react-icons/bi";
// import { BiLogIn } from "react-icons/bi";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineUserAdd,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillInstagram
} from "react-icons/ai";
import { FcServices } from "react-icons/fc";
////////////////////////
//  import { useNavigate, LINK } from "react-router-dom";
import "./footer.css";
import { useNavigate, Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import FeedBack from "../feedback/Feedback";
import payCards from "../../image/cards.png";

const Footer = () => {
  const nav = useNavigate();

  return (
    <>
      <div className="footer">
        {/* <FeedBack /> */}
        <div className="groupFooter">
          <div className="SocialMedia">
            <h2 className="follow">Follow Us On Social Media</h2>

            <a href="https://web.facebook.com/TechniCorner-113936371207625/about/?ref=page_internal">
              <AiFillFacebook/> Facebook
            </a>

            <a href="http://twitter.com/"><AiFillTwitterCircle/> Twitter</a>

            <a href="https://www.youtube.com/channel/UCcO5lahWe1dFGemPIgJtK1w/">
              <AiFillYoutube/> Youtube
            </a>

            <a href="https://www.instagram.com/technicorner7/"><AiFillInstagram/> Instagram</a>
          </div>

          <div className="links">
            <h2 className="imp">Important Links</h2>
            <Link className="gg" to={"homePage"}>
              Home
            </Link>
            <Link className="gg" to={"register"}>
              Register
            </Link>{" "}
            <Link className="gg" to={"login"}>
              Login
            </Link>
          </div>
        </div>
        <div className="infoFooter">
          <h2 className="duty">06-474747470 (Saturday - Thursday 8am - 5pm)</h2>

          <img src={payCards} alt="pa" id="imgPay" />

          <h4 className="paymnt">
            Finance provided by PayPal Credit. Terms and conditions apply.
            Credit subject to status. UK residents only. Industrial Tool
            Supplies (London) Limited acts as a credit broker and offers finance
            from a restricted range of finance providers. PayPal Credit is a
            trading name of PayPal (Europe) S.a.r.l. et Cie, S.C.A., 22-24
            Boulevard Royal L-2449, Luxembourg.
          </h4>
          <br></br>

          <h4 className="rights">
            Developed By ERRORS-TEAM All Rights Reserved &#169; 2022
          </h4>
        </div>
      </div>
    </>
  );
};
export default Footer;
