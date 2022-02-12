import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";

const secondExample = {
  size: 50,
  count: 10,
  color: "black",
  activeColor: "red",
  value: 7.5,
  a11y: true,
  isHalf: true,
  emptyIcon: <i className="far fa-star" />,
  halfIcon: <i className="fa fa-star-half-alt" />,
  filledIcon: <i className="fa fa-star" />,
  onChange: (newValue) => {
    console.log(`Example 2: new value is ${newValue}`);
  },
};
const thirdExample = {
  size: 40,
  count: 5,
  isHalf: false,
  value: 0,

  onChange: (newValue) => {
    console.log(`Example 3: new value is ${newValue}`);
  },
};

const Rate = () => {
  return <ReactStars {...thirdExample} />;
};
export default Rate;
