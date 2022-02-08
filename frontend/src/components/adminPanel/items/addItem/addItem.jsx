/** @format */

// /** @format */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  // const [imageSelected, setImageSelected] = useState("");
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
        title: "sss",
        descriptions: "ddd",
        img: imageUrl,
        price: 3,
        category_id: 1,
      };
      const result = await axios.post("http://localhost:5000/item", item, {
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

  useEffect(() => {
    if (!isLoggedIn) {
      history("/homePage");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewItem}>
        <br />
        <input
          type="text"
          placeholder="item title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="item description here"
          onChange={(e) => setDescriptions(e.target.value)}
        ></textarea>
        <br />
        <input
          type="number"
          placeholder="item price here"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          type="text"
          list="data"
          placeholder="Category Type"
          onClick={(e) => {
            e.target.value = "";
          }}
          onChange={(e) => {
            console.log(e.target.id);
            setCategory_id(e.target.id);
          }}
        />
        <datalist id="data">
          <option id={1} value={"Hand Tools"} />
          <option id={2} value={"Power Tools"} />
          <option id={3} value={"Safety Work wear"} />
        </datalist>
        <br />

        {/* <input
          type="file"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        /> */}

        <input
          type="file"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}> upload image</button>

        <button>Create New item</button>
      </form>

      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}

      <>
        {/* <Image 
        
        style={{width:300}}
        cloudName="debtpixx1" 
       publicId={imageUrl} />  */}
      </>
    </>
  );
};

export default AddItem;
