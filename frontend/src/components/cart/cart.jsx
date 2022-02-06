import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart, deleteCart } from "../../reducer/cart/index";
import { RiPaypalLine, RiVisaFill } from "react-icons/ri";
import { FaCcMastercard, FaBitcoin } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const { token, carts } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      carts: state.cartReducer.carts,
    };
  });

  const getCartById = async () => {
    await axios
      .get(`http://localhost:5000/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setCart(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCartById = async (id) => {
    //delete http://localhost:5000/cart/:id

    await axios
      .delete(`http://localhost:5000/cart/${id}`)
      .then((result) => {
        dispatch(deleteCart(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartById();
  }, []);

  let totalPrice = 0;
  return (
    <div className="cart">
      <div className="cart_nav_box">
        <ul>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTickIcon.png"
              alt="Price match promise"
            />
            <span>Price match promise</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSDeliveryIcon.png"
              alt="ext day delivery, 7 days a week"
            />
            <span>Next day delivery, 7 days a week</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTrustpilotIcon.png"
              alt="5 Star Rating on Trustpilot"
            />
            <span>5 Star Rating on Trustpilot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSHourIcon.png"
              alt="One Hour Delivery slot"
            />
            <span>One Hour Delivery slot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPDrillIcon.png"
              alt="Finance Available over £99 inc VAT"
            />
            <span>Finance Available over JD99 inc VAT</span>
          </li>
        </ul>
      </div>

      <dir className="cart_header">
        <div>
          <h1>YOUR SHOPPING Cart</h1>
        </div>
      </dir>

      {carts.length > 0 ? (
        carts.map((cart, index) => {
          totalPrice += cart.price;

          return (
            <div key={index} className="cart_box">
              <div className="cart_img_box">
                <div className="info_center">
                  <img src={cart.img} alt={cart.title} />
                </div>

                <div className="cart_title">
                  <span>{cart.title}</span>
                </div>
              </div>
              <div className="payment_box_info">
                <h4>payment options</h4>
                <div>
                  <RiPaypalLine />
                  <RiVisaFill />
                  <FaCcMastercard />
                  <FaBitcoin />
                </div>
              </div>
              <div className="info_box info_box_cart">
                {/* <div className="info_center">
                  <h3>description</h3>
                  <span>{cart.description}</span>
                </div> */}
                <div className="info_center">
                  <h3>price</h3>
                  <span>JOD {cart.price}</span>
                </div>
                {/* <div className="info_center">
                  <h3>rate</h3>
                  <span>{cart.rate}</span>
                </div> */}

                <button
                  style={{
                    borderColor: "red",
                  }}
                  id={cart.id}
                  onClick={(e) => {
                    deleteCartById(cart.cart_id);
                  }}
                >
                  Remove from cart
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>no carts</div>
      )}
      <div className="info_box buy_box payment_box_info">
        <button>BUY</button>
        <span>JOD {totalPrice}</span>
      </div>
    </div>
  );
};

export default Cart;
