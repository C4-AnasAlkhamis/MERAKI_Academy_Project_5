import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const Pay = ({ items, price }) => {
  const [isDone, setIsDone] = useState(false);
  let description = "";
  items.map((item) => {
    return (description += `${item.title}, `);
  });

  // yJ6N&FPp
  // sb-kgjsd13291652@personal.example.com

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
