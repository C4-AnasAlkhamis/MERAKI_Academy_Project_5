/** @format */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./homePage.css";
import PaginateReact from "react-paginate";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../reducer//index";
import { setItemInfo } from "../../reducer/itemInfo/index";
import { useNavigate } from "react-router-dom";

//===============================================================

const ShowUsers = () => {
  const {users} = useSelector((state) => {
    return {
      users: state.usersReducer.users,
    };
  });

  //===============================================================

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user");
      if (res.data.success) {
        dispatch(setItems(res.data.items));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  return <div className="showUsers">

  </div>;
};

export default ShowUsers;
