/** @format */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./homePage.css";
import PaginateReact from "react-paginate";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../reducer/item/index";
import { setItemInfo } from "../../reducer/itemInfo/index";
import { useNavigate } from "react-router-dom";

//===============================================================
import handTool from "../../image/header.png";
import powerTool from "../../image/header.jpg";
import safetyTool from "../../image/landing-banner-d (1).jpg";

//===============================================================

const HomePage = () => {
  // ---------------------------------------------
  const options = [
    { value: "Grinder", label: "Grinder" },
    { value: "Inflator", label: "Inflator" },
    { value: "Nailer", label: "Nailer" },
    { value: "Drill", label: "Drill" },
    { value: "Multi", label: "Multi Tool" },
    { value: "Boot", label: "Boot" },
    { value: "Helmet", label: "Helmet" },
    { value: "Toolvest", label: "Toolvest" },
    { value: "Trousers", label: "Trousers" },
    { value: "Shield", label: "Shield" },
  ];
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
  const [isFilter, setIsFilter] = useState(false);
  const [pgNum, setPgNum] = useState(0);

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

  const getFilteredItems = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/item/filter",
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setIsFilter(true);
        dispatch(setItems(res.data.items));
        setMessage("");
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      console.log(error);
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

  const getItemById = async (id) => {
    //get http://localhost:5000/item/

    await axios
      .get(`http://localhost:5000/item/id?id=${id}`)
      .then((result) => {
        dispatch(setItemInfo({ ...result.data.result }));
        navigate("/more-info");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //
  //===============================================================
  let categoriesMap = categories.map((category, index) => {
    return (
      <li
        key={index}
        id={category.id}
        onClick={(e) => {
          getAllItems();
          setCategoryId(parseInt(e.target.id));
          setIsFilter(false);
        }}>
        {category.category}
      </li>
    );
  });

  let itemsMap;
  if (isFilter) {
    itemsMap = items;
  } else {
    itemsMap = items.filter((item, index) => {
      return item.category_id === categoryId;
    });
  }

  const headerImg = () => {
    switch (categoryId) {
      case 1:
        return (
          <>
            <img src={handTool} />
          </>
        );

      case 2:
        return (
          <>
            <img src={powerTool} />
          </>
        );

      case 3:
        return (
          <>
            <img src={safetyTool} />
          </>
        );
      default:
        return;
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllItems();
  }, []);
  //===============================================================

  const itemsPerPg = 15;
  const pgVS = pgNum * itemsPerPg;
  const pageCount = Math.ceil(itemsMap.length / itemsPerPg);
  const changePage = ({ selected }) => {
    console.log(selected);
    setPgNum(selected);
  };
  const display = itemsMap.slice(pgVS, pgVS + itemsPerPg).map((item, index) => {
    return (
      <div key={index} className="item">
        <div className="title">
          <p>{item.title}</p>
        </div>
        <div className="img_box">
          {item.img ? <img src={item.img} alt={item.title} /> : null}
        </div>
        <div className="info_box">
          <h1>{item.price} JOD</h1>
          <span>{item.rate}</span>
        </div>
        <div className="btn">
          <button
            id={item.id}
            onClick={(e) => {
              getItemById(e.target.id);
            }}>
            ITEM DETAILS
          </button>
        </div>
      </div>
    );
  });

  //===============================================================
  return (
    <div className="homePage">
      <div className="categories">
        <ul>
          {categoriesMap}
        </ul>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => {
            getFilteredItems(`%${e.target.value}%`);
          }}
        />
      </div>
      <div className="Hadar">{headerImg()}</div>
      <div className="filter_box">
        <Select
        className="filter"
          onChange={(e) => {
            getFilteredItems(`%${e.value}%`);
          }}
          options={options}
          placeholder="Filter"
        />
      </div>
      <div className="items">
        {display}

        {/* {itemsMap.map((item, index) => {
          return (
            <div key={index} className="item">
              <div className="title">
                <p>{item.title}</p>
              </div>
              <div className="img_box">
                {item.img ? <img src={item.img} alt={item.title} /> : null}
              </div>
              <div className="info_box">
                <h1>{item.price} JOD</h1>
                <span>{item.rate}</span>
              </div>
              <div className="btn">
                <button
                  id={item.id}
                  onClick={(e) => {
                    getItemById(e.target.id);
                  }}
                >
                  ITEM DETAILS
                </button>
              </div>
            </div>
          );
        })} */}
      </div>
      <PaginateReact
        PreviousLabel={"Previous"}
        NextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination_box"}
        disabledClassName={" paginationDisabled "}
        activeClassName={" paginationActive "}
      />
    </div>
  );
};

export default HomePage;
