import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { useSelector, useDispatch } from "react-redux";
import { setCart, deleteCart } from "../../reducer/cart/index";
import { RiPaypalLine, RiVisaFill } from "react-icons/ri";
import { FaCcMastercard, FaBitcoin } from "react-icons/fa";
import Pay from "../payment/Payment";

import Swal from "sweetalert2";

const Cart = () => {
  // const [id, setId] = useState();
  const dispatch = useDispatch();
  const { token, carts } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      carts: state.cartReducer.carts,
    };
  });
  const [total, setTotal] = useState(0);

  const popupCartDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this process!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#04518c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartById(id);
        Swal.fire({
          confirmButtonText: "Removed!",
          title: "Your item has been removed!.",
          icon: "success",
          confirmButtonColor: "#04518c",
        });
      }
    });
  };

  // ======================================= //
  const getCartById = async () => {
    await axios
      .get(`/cart/`, {
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
  // ======================================= //

  const deleteCartById = async (id) => {
    //delete /cart/:id

    await axios
      .delete(`/cart/${id}`)
      .then((result) => {
        getCartById();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // // ======================================= //

  useEffect(() => {
    getCartById();
  }, []);
  useEffect(() => {
    if (totalPrice !== total) {
      setTotal(totalPrice);
    }
  });
  // ======================================= //

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
            <span>5 Star Rating on Trust pilot</span>
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
            <span>Finance Available over $99 inc VAT</span>
          </li>
        </ul>
      </div>

      <dir className="cart_header">
        <div>
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="buy_box">
          <PayPalScriptProvider>
            <Pay items={carts} price={total} />
          </PayPalScriptProvider>
          <div className="price_box">
            <p>Total Price </p>
            <span>{total} $</span>
          </div>
        </div>
      </dir>

      {carts.length > 0 ? (
        carts.map((cart, index) => {
          totalPrice += parseInt(cart.total_price);
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
                <div>
                  <RiPaypalLine />
                  <RiVisaFill />
                  <FaCcMastercard />
                  <FaBitcoin />
                </div>
                <h3>{cart.descriptions}</h3>
              </div>
              <div className="counter_price">
                <span>{cart.count}</span>
                <p>
                  total price <span>{cart.total_price}</span> $
                </p>
              </div>

              <div className="info_center">
                <h3>price</h3>
                <span>{cart.price} $</span>
              </div>

              <button
                className="cart_btn"
                style={{
                  borderColor: "red",
                }}
                id={cart.id}
                onClick={(e) => {
                  popupCartDelete(cart.cart_id);
                }}
              >
                Remove it !
              </button>
            </div>
          );
        })
      ) : (
        <div>No Cart Yet!</div>
      )}
    </div>
  );
};

export default Cart;
