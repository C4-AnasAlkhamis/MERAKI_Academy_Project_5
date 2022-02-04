/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../reducer/item/index";
//===============================================================

const HomePage = () => {
  // ---------------------------------------------
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      items: state.itemsReducer.items,
      categories: state.itemsReducer.categories,
    };
  });

  const { categories, token, items } = state;

  const dispatch = useDispatch();
  // ---------------------------------------------
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  //===============================================================

  const getAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/item", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setItems(res.data.items));
        setMessage("");
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setCategories(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  useEffect(() => {
    getAllCategories();
    getAllItems();
  }, []);

  //===============================================================
  let categoriesMap = categories.map((category, indx) => {
    return (
      <>
        <li
          id={category.id}
          onClick={(e) => {
            setCategoryId(parseInt(e.target.id));
          }}>
          {category.category}
        </li>
      </>
    );
  });
  let itemsMap = items.filter((item, index) => {
    return item.category_id === categoryId;
  });
  return (
    <div className="homePage">
      <div className="categories">
        <ul>{categoriesMap}</ul>
      </div>

      <div className="items">
        {itemsMap.map((item, index) => {
          return (
            <div className="item">
              <div className="img_box">
                {item.img ? <img src={item.img} alt={item.title} /> : null}
              </div>
              <div className="info_box">
                <p>{item.title}</p>
                <p>{item.descriptions}</p>
                <span>$ {item.price}</span>
                <span>{item.rate}</span>
              </div>
              <div className="btn"><button>Item Details</button></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
