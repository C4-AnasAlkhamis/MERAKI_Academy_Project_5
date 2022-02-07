import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Pay = ({ items, price }) => {
  const [isDone, setIsDone] = useState(false);
  // const [paidFor, setPaidFor] = useState(false);
  // const [error, setError] = useState(null);
  // const carts = items.map((item) => {
  //   return item.title;
  // });
  // yJ6N&FPp
  // sb-kgjsd13291652@personal.example.com

  return (
    <>
      {isDone ? (
        <div>
          <PayPalScriptProvider
            options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
          >
            <PayPalButtons
              style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                shape: "pill",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "dril",
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

                alert(
                  `Transaction completed by ${order.payer.name.given_name} `
                );
              }}
              onError={(err) => {
                console.error("paypal error", err);
              }}
            />
          </PayPalScriptProvider>
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
