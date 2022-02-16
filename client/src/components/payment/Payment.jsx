import React, { useState } from "react";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserCarts } from "../../reducer/cart/index";
import Swal from "sweetalert2";
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
  const popupCart = () => {
    Swal.fire({
      title:
        "Your purchase has been successful, your items will be shipped within 24 hours.",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  // yJ6N&FPp
  // sb-kgjsd13291652@personal.example.com
  // ======================================= //
  const deleteCartByUserId = async () => {
    //delete /cart/user
    await axios
      .delete(`/cart`, {
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
      {isDone ? null : (
        <div className="payment_btn">
          <button
            onClick={() => {
              setIsDone(!isDone);
            }}
          >
            Order Now
          </button>
        </div>
      )}
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
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                deleteCartByUserId();
                popupCart();
              });
            }}
            onError={(err) => {
              alert(`paypal error ${err} `);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default Pay;
