/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Rate from "../rate/Rate";
import { useNavigate } from "react-router-dom";
import "./itemInfo.css";
import { useSelector, useDispatch } from "react-redux";
import {
  RiMoneyDollarCircleLine,
  RiPaypalFill,
  RiArrowGoBackLine,
} from "react-icons/ri";
import { BsFillCalendarCheckFill, BsHourglassSplit } from "react-icons/bs";
import { AiOutlineFastBackward } from "react-icons/ai";

import { FaShippingFast } from "react-icons/fa";

import Swal from "sweetalert2";

const popupCart = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "This Item Added To Your Cart Successfully!",
    showConfirmButton: false,
    timer: 1500,
  });
};

const popupWishlist = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "This Item Added To Your Wishlist Successfully!",
    showConfirmButton: false,
    timer: 1500,
  });
};

const ItemInfo = ({ setShow }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { item, token } = useSelector((state) => {
    return {
      item: state.itemInfoReducer.itemInfo,
      token: state.loginReducer.token,
    };
  });
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);
  const Cart = () => {
    const createNewCartOrWishlist = async (endPoint) => {
      try {
        const result = await axios.post(
          `/${endPoint}`,
          { item_id: item.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {}
    };
    return (
      <div>
        <button
          id="cart"
          onClick={(e) => {
            createNewCartOrWishlist(e.target.id);
            popupCart();
          }}
          style={{ display: `${item.is_deleted ? "none" : null}` }}
        >
          Add to Cart
        </button>
        <button
          id="wishlist"
          onClick={(e) => {
            createNewCartOrWishlist(e.target.id);
            popupWishlist();
          }}
        >
          Add to Wishlist
        </button>
      </div>
    );
  };

  return (
    <div className="item_info_box">
      <>
        <div className="box">
          <i
            onClick={() => {
              setShow(true);
            }}
          >
            <RiArrowGoBackLine className="back_icon" />
          </i>
          <div className="titleI">
            <h2>
              <p>{item.title}</p>
            </h2>
          </div>
          <div className="sub_titleI">
            <p> Order Reference: 977209</p>

            <div>
              <h3>
                <p style={{ color: `${item.is_deleted ? "red" : "green"}` }}>
                  {item.descriptions}
                </p>
              </h3>
              <Rate item_id={item.id} />
            </div>
          </div>
          <div className="img_boxI">
            <img className="itemI" src={item.img} alt={item.title} />
            <div className="info_boxI">
              <h4>
                <span className="price"> {item.price} $</span>
                <br />
              </h4>
              <ul>
                <span className="list_title">
                  Order within 6 Hours and 15 Minutes for earliest possible
                  delivery.
                </span>
                <li>
                  <span>
                    <RiMoneyDollarCircleLine /> Free Delivery
                  </span>
                </li>
                <li>
                  <span>
                    <BsFillCalendarCheckFill /> Select Your Own Delivery Date
                  </span>
                </li>
                <li>
                  <span>
                    <FaShippingFast /> Next Day Delivery Service
                  </span>
                </li>
                <li>
                  <span>
                    <BsHourglassSplit /> 1 Hour Delivery Slot
                  </span>
                </li>
                <li>
                  <span>
                    <RiPaypalFill /> Spread the cost over 4 months with 0%
                    Interest from PayPal
                  </span>
                </li>
              </ul>
              <div>
                <Cart />
              </div>
              {/* <img
                  src="https://its-london.s3-eu-west-1.amazonaws.com/CMS/Footer/cards.png"
                  alt=""
                /> */}
            </div>
          </div>
          {/* <img className="tool" src={tool} alt={"tool"} /> */}
        </div>
        <div className="btnI"></div>
      </>
    </div>
  );
};

export default ItemInfo;
