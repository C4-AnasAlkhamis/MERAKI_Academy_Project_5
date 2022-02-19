/** @format */

// /** @format */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addItem.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../../../reducer/item/index";
import { Image } from "cloudinary-react";
import Select from "react-select";

//===============================================

const AddItem = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  const { token, isLoggedIn } = state;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const options = [
    { value: 1, label: "Hand Tools" },
    { value: 2, label: "Power Tools" },
    { value: 3, label: "Safty Work Waer" },
    { value: 4, label: "Tool Storage" },
  ];
  //===================================================

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", img);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        createNewItem(res.data.secure_url);
      });
  };

  //====================================================

  const createNewItem = async (img) => {
    try {
      const item = {
        title: title,
        descriptions: "in stock",
        img,
        price: price,
        category_id: category_id,
      };
      const result = await axios.post("/item/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(addItem({ title, descriptions, img, price, category_id }));
        setMessage("The item has been created successfully");
        setTitle("");
        setPrice("");
        setImg("");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //=======================================================
  return (
    <div className="addItemAdmin">
      <h2>NEW ITEM</h2>
      <br />
      <input
        type="text"
        placeholder="TITLE"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <br />
      <input
        type="number"
        placeholder="PRICE"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <Select
        onChange={(e) => {
          setCategory_id(e.value);
        }}
        options={options}
        placeholder="Categories"
      />
      <br />
      <input
        type="file"
        onChange={(e) => {
          setImg(e.target.files[0]);
        }}
        value={img}
      />
      <div className="addItemBTN">
        <button
          onClick={() => {
            uploadImage();
          }}
        >
          Create New item
        </button>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </div>
  );
};

export default AddItem;
