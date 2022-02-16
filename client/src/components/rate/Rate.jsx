import axios from "axios";
import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addRate } from "../../reducer/rate/rate";
const Rate = ({ item_id }) => {
  const dispatch = useDispatch();

  const addNewRate = async (rate) => {
    await axios
      .post("/rate", { rate, item_id })
      .then((result) => {
        dispatch(addRate({ rate: rate, item_id: item_id }));
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
      addNewRate(newValue);
    },
  };
  return <ReactStars {...thirdExample} />;
};
export default Rate;
