/** @format */

import React, { useState,useEffect } from "react";

const MainPage = () => {
  const getAllFeedBack = async () => {
    const [feedbacks, setFeedbacks] = useState([]);
    try {
      const res = await axios.get("http://localhost:5000/item/feedback");
      if (res.data.success) {
        setFeedbacks(res.data.result);
        console.log(feedbacks);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  return (
    <div className="mainPage">
      <h1>Main</h1>
    </div>
  );
};

export default MainPage;
