// /** @format */

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

// // import { useNavigate, LINK } from "react-router-dom";
import "./footer.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import FeedBack from "../feedback/Feedback";
import payCards from '../../image/cards.png';
const Footer = () => {
  return (
    <>
      <div className="footer">
        <FeedBack />
        <div className="secondContainer">
          <div className="socContainer">
            <div className="1">
              <h2 className="follow">Follow Us On Social Media</h2>
              <ul className="social">
                <li>
                  {/* <a href="http://facebook.com/">Facebook</a> */}
                  Facebook</li>
                <li>
                  {/* <a href="http://twitter.com/">Twitter</a> */}
                  Twitter</li>
                <li>
                  {/* <a href="http://Youtube.com/">Youtube</a> */}
                  Youtube</li>
                <li>
                  {/* <a href="http://Instagram.com/">Instagram</a> */}
                  Instagram</li>
              </ul>
            </div>

            <div className="2">
              <h2 className="imp">Important Links</h2>
              <ul className="impLink">
                <li>Home</li>
                <li>Tool Storage</li>
                <li>Safty Work Waer</li>
                <li>Power Tools</li>
                <li>Hand Tools</li>

              </ul>
            </div>
          </div>
          <h2 className="duty">
            06-474747470 (Saturday - Thursday 8am - 5pm)
          </h2>

          <img src={payCards} alt="pa"/>

          <h4 className="paym">
            Finance provided by PayPal Credit. Terms and conditions apply.
            Credit subject to status. UK residents only. Industrial Tool
            Supplies (London) Limited acts as a credit broker and offers finance
            from a restricted range of finance providers. PayPal Credit is a
            trading name of PayPal (Europe) S.a.r.l. et Cie, S.C.A., 22-24
            Boulevard Royal L-2449, Luxembourg.
          </h4>
        </div>
      </div>
    </>
  );
};
export default Footer;
