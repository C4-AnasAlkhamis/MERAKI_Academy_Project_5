import axios from "axios";
import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";

const Rate = ({ item_id }) => {
  const addRate = async (rate) => {
    await axios
      .post("http://localhost:5000/rate", { rate, item_id })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const thirdExample = {
    size: 40,
    count: 6,
    isHalf: false,
    value: 0,

    onChange: (newValue) => {
      addRate(newValue);
    },
  };
  return <ReactStars {...thirdExample} />;
};
export default Rate;
