import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, LINK } from "react-router-dom";
import "./itemInfo.css";
import { setItemInfo, updateItemInfo } from "../../reducer/itemInfo/index";
import { useSelector, useDispatch } from "react-redux";

const ItemInfo = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const state = useSelector((state) => {
    return { item: state.itemInfoReducer.itemInfo };
  });

  // ============================================= //

  const getItemById = async () => {
    //get http://localhost:5000/item/

    await axios
      .get(`http://localhost:5000/item/id?id=${state.item.id}`)
      .then((result) => {
        dispatch(setItemInfo({ ...result.data.result }));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ============================================= //

  const deleteItemById = async () => {
    await axios
      .delete(`http://localhost:5000/item/${state.item.id}`)
      .then((result) => {
        setMessage("Item has been deleted successfully");
        setIsDeleted(true);
        dispatch(setItemInfo(""));
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
        setMessage("Error happened while deleting the item");
      });
  };
  // useEffect(() => {
  //   getItemById();
  // }, []);
  return (
    <div className="item_info_box">
      {isDeleted ? (
        <span>{message}</span>
      ) : (
        <>
          <div className="img_box">
            <img src={state.item.img} alt="" />
          </div>
          <div className="info_box">
            <p>{state.item.title}</p>
            <span>$ {state.item.price}</span>
            <span>{state.item.rate}</span>
          </div>
          <div>
            <button onClick={deleteItemById}>delete</button>
            {/* <button onClick={updateItemById}>update</button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemInfo;
