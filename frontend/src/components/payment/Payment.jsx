import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserCarts } from "../../reducer/cart/index";
const Pay = ({ items, price }) => {
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  let description = "";
  items.map((item) => {
    return (description += `${item.title}, `);
  });
  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  // yJ6N&FPp
  // sb-kgjsd13291652@personal.example.com
  // ======================================= //
  const deleteCartByUserId = async () => {
    //delete http://localhost:5000/cart/user
    await axios
      .delete(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(deleteUserCarts());
      })
      .catch((err) => {
        console.log(err.response);
      });
    // ======================================= //
  };
  return (
    <>
      {isDone ? (
        <div>
          <PayPalButtons
            style={{
              color: "silver",
              layout: "horizontal",
              height: 48,
              tagline: false,
              shape: "pill",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: description,
                    amount: {
                      value: price,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              alert(`Transaction completed by ${order.payer.name.given_name} `);
              deleteCartByUserId();
            }}
            onError={(err) => {
              alert(`paypal error ${err} `);
            }}
          />
        </div>
      ) : null}

      {isDone ? null : (
        <button
          onClick={() => {
            setIsDone(!isDone);
          }}
        >
          showPay
        </button>
      )}
    </>
  );
};

export default Pay;
