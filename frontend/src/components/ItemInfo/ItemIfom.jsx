import axios from "axios";
import React, { useState } from "react";

import { useNavigate, LINK } from "react-router-dom";
import "./itemInfo.css";
import { setItemInfo } from "../../reducer/itemInfo/index";
import { useSelector, useDispatch } from "react-redux";

const ItemInfo = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return { item: state.itemInfoReducer.itemInfo };
  });
  // const getItemById = async (e) => {
  //   e.preventDefault();
  //   //get http://localhost:5000/item/

  //   await axios
  //     .get(`http://localhost:5000/item/${id}`)
  //     .then((result) => {
  //       dispatch(setItemInfo(result.data.result));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="item_info_box">
        <div className="img_box">
          <img src={state.item.img} alt="" />
        </div>
        <div className="info_box">
          <p>{state.item.title}</p>
          <span>{state.item.price}</span>
          <span>{state.item.rate}</span>
        </div>
      </div>
    </>
  );
};

export default ItemInfo;
