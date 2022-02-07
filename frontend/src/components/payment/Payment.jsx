import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Pay = ({ items, price }) => {
  const [isDone, setIsDone] = useState(true);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const carts = items.map((item) => {
    return 
     
    
  });
    console.log(carts);

  return (
    <>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          style={{
            color: "silver",
            height: 48,
            shape: "pill",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                    description: "",
                  amount: {
                    value: price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);

            alert(`Transaction completed by ${order} `);
          }}
          onError={(err) => {
            setError(err);
            console.error("paypal error", err);
          }}
        />
      </PayPalScriptProvider>
      <button
        onClick={() => {
          setIsDone(!isDone);
        }}
      >
        showPay
      </button>
    </>
  );
};

export default Pay;
