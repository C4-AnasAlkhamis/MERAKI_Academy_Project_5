/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, LINK } from "react-router-dom";
import "./itemInfo.css";
import { setItemInfo, updateItemInfo } from "../../reducer/itemInfo/index";
import { useSelector, useDispatch } from "react-redux";
import { RiMoneyDollarCircleLine, RiPaypalFill } from "react-icons/ri";
import { BsFillCalendarCheckFill, BsHourglassSplit } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

import tool from '../../image/crown.png'


const ItemInfo = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);

  const state = useSelector((state) => {
    return {
      item: state.itemInfoReducer.itemInfo,
      token: state.loginReducer.token,
    };
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
  const updateItemById = async () => {
    await axios
      .put(`http://localhost:5000/item/2`, {
        image: image ? image : state.item.image,
        title: title ? title : state.item.title,
        description: description ? description : state.item.description,
        category: category ? category : state.item.category,
        price: price ? price : state.item.price,
      })
      .then((result) => {
        setMessage("Item has been updating successfully");
        console.log(result);
        dispatch(
          updateItemInfo({
            image: image ? image : state.item.image,
            title: title ? title : state.item.title,
            description: description ? description : state.item.description,
            category: category ? category : state.item.category,
            price: price ? price : state.item.price,
            id: state.item.id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error happened while updating the item");
      });
  };

  const Cart = () => {
    const createNewCartOrWishlist = async (endPoint) => {
      try {
        const result = await axios.post(
          `http://localhost:5000/${endPoint}`,
          { item_id: state.item.id },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
      } catch (error) {}
    };
    return (
      <div>
        <button
          id="cart"
          onClick={(e) => {
            createNewCartOrWishlist(e.target.id);
          }}>
          Add to Cart
        </button>
        <button
          id="wishlist"
          onClick={(e) => {
            createNewCartOrWishlist(e.target.id);
          }}>
          Add to Wishlist
        </button>
      </div>
    );
  };
  // image, title, description, category, price, id
  // useEffect(() => {
  //   getItemById();
  // }, []);
  return (
    <div className="item_info_box">
      {isDeleted ? (
        <span>{message}</span>
      ) : (
        <>
          <div className="box">
            <div className="titleI">
              <p>{state.item.title}</p>
            </div>
            <div className="sub_titleI">
              <p> Order Reference: 977209</p>
              </div>
            <div className="img_boxI">
              <img className="tool" src={tool} alt={"tool"} />
              <img className="itemI" src={state.item.img} alt={state.item.title} />
          <div className="info_box">
            <span>
              Order within 6 Hours and 15 Minutes for earliest possible
              delivery.
            </span>
              <ul>
                <li>
                  <span>
                    <RiMoneyDollarCircleLine />
                    Free Delivery
                  </span>
                </li>
                <li>
                  <span>
                    <BsFillCalendarCheckFill />
                    Select Your Own Delivery Date
                  </span>
                </li>
                <li>
                  <span>
                    <FaShippingFast />
                    Next Day Delivery Service
                  </span>
                </li>
                <li>
                  <span>
                    <BsHourglassSplit /> 1 Hour Delivery Slot
                  </span>
                </li>
                <li>
                  <span>
                    <RiPaypalFill />
                    Spread the cost over 4 months with 0% Interest from PayPal
                  </span>
                </li>
              </ul>
              <div>
                <img
                  src="https://its-london.s3-eu-west-1.amazonaws.com/CMS/Footer/cards.png"
                  alt=""
                />
              <Cart />
              </div>
            </div>

            <span>$ {state.item.price}</span>
            <span>{state.item.rate}</span>
          </div>
            </div>
            <div className="btnI">
          </div>

          <div>
            {/* <div className="update_box">
              <button onClick={deleteItemById}>delete</button> */}
            {/* <div className="update_item">
                <input
                  type="text"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  placeholder="Image URl"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Title"
                />
                <input
                  type="number"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  placeholder="Category"
                />
                <input
                  type="number"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  placeholder="Price"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Description"
                />
                <button onClick={updateItemById}>update</button> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemInfo;
