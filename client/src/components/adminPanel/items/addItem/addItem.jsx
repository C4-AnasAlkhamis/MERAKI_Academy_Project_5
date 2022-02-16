/** @format */

// /** @format */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addItem.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../../../reducer/item/index";
import { Image } from "cloudinary-react";

//===============================================================

const AddItem = () => {
  const history = useNavigate();

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
  const [imageUrl, setImageUrl] = useState("");

  //===============================================================

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", img);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        setImageUrl(res.data.secure_url);
        console.log(res.data.secure_url);
      });
  };

  //===============================================================

  const createNewItem = async (e) => {
    e.preventDefault();

    try {
      const item = {
        title: title,
        descriptions: "in stock",
        img: imageUrl,
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
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================
  return (
    <div className="addItemAdmin">
      <h2>NEW ITEM</h2>
      <br />
      <input
        type="text"
        placeholder="TITLE"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="PRICE"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        placeholder="CATEGORY"
        onChange={(e) => setCategory_id(e.target.value)}
      />
      <datalist id="data">
        <option id={1} value={"Hand Tools"} />
        <option id={2} value={"Power Tools"} />
        <option id={3} value={"Safety Work wear"} />
      </datalist>
      <br />

      <input
        type="file"
        onChange={(e) => {
          setImg(e.target.files[0]);
        }}
      />
      <div className="addItemBTN">
        {/* <button onClick={uploadImage}> upload image</button> */}
        <button
          onClick={() => {
            uploadImage();
            createNewItem();
          }}>
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
