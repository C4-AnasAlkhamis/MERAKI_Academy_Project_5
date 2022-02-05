import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart, deleteCart } from "../../reducer/cart/index";

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
      <h1>cart content </h1>

      {carts ? (
        carts.map((cart, index) => {
          totalPrice += cart.price;
          // setTotalPrice(cart.price++);
          return (
            <div key={index}>
              <div className="cart_box">
                <div>
                  <img src={cart.img} alt={cart.title} />
                </div>
                <div className="info_box flex_column">
                  <span>{cart.title}</span>
                  <span>{cart.description}</span>
                  <span>$ {cart.price}</span>
                  <span>{cart.rate}</span>
                  <button
                    id={cart.id}
                    onClick={(e) => {
                      deleteCartById(cart.cart_id);
                    }}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>no carts</div>
      )}
      <div className="buy_box">
        <span>{totalPrice}</span>
        <button>BUY</button>
      </div>
    </div>
  );
};

export default Cart;
