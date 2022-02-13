/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Rate from "../rate/Rate";
import { useNavigate } from "react-router-dom";
import "./itemInfo.css";
import { setItemInfo } from "../../reducer/itemInfo/index";
import { useSelector, useDispatch } from "react-redux";
import { RiMoneyDollarCircleLine, RiPaypalFill } from "react-icons/ri";
import { BsFillCalendarCheckFill, BsHourglassSplit } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

const popupCart = () => {
  Swal.fire({
    title: "This Item Added To Your Cart Successfully!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

const popupWishlist = () => {
  Swal.fire({
    title: "This Item Added To Your Wishlist Successfully!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

const ItemInfo = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const state = useSelector((state) => {
    return {
      item: state.itemInfoReducer.itemInfo,
      token: state.loginReducer.token,
    };
  });
  // ============================================= //

  const getItemById = async () => {
    //get http://localhost:5000/item/id?id=$id
    await axios
      .get(`http://localhost:5000/item/id?id=${state.item.id}`)
      .then((result) => {
        dispatch(setItemInfo({ ...result.data.result }));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ============================================= //

  const Cart = () => {
    const createNewCartOrWishlist = async (endPoint) => {
      try {
        const result = await axios.post(
          `http://localhost:5000/${endPoint}`,
          { item_id: state.item.id },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
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
      {isDeleted ? (
        <span>{message}</span>
      ) : (
        <>
          <div className="box">
            <div className="titleI">
              <h2>
                <p>{state.item.title}</p>
              </h2>
            </div>
            <div className="sub_titleI">
              <p> Order Reference: 977209</p>
            
              <div>
              <h3>
                <p style={{ color: "green" }}>{state.item.descriptions}</p>
              </h3>
                <Rate item_id={state.item.id} />
              </div>
            </div>
            <div className="img_boxI">
              <img
                className="itemI"
                src={state.item.img}
                alt={state.item.title}
              />
              <div className="info_box">
                <h4>
                  <span className="price"> {state.item.price} $</span>
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
                  <span>{state.item.rate}</span>
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
      )}
    </div>
  );
};

export default ItemInfo;
