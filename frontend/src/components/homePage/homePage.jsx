/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../reducer/item/index";
import { setItemInfo } from "../../reducer/itemInfo/index";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
  const getItemById = async (id) => {
    //get http://localhost:5000/item/

    await axios
      .get(`http://localhost:5000/item/id?id=${id}`)
      .then((result) => {
        dispatch(setItemInfo({ ...result.data.result }));
        console.log(...result.data.result);
        navigate("/more-info")
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              <div className="btn">
                <button
                  id={item.id}
                  onClick={(e) => {
                    getItemById(e.target.id);
                  }}>
                  Item Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
