/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const getAllFeedBack = async () => {
    try {
      const res = await axios.get("http://localhost:5000/item/feedback");
      if (res.data.success) {
        setFeedbacks(res.data.result);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        // return setMessage(error.response.data.message);
      }
      console.log("Error happened while Get Data, please try again");
    }
  };

  useEffect(() => {
    getAllFeedBack();
  }, []);

  return (
    <div className="mainPage">
      <h1>Main</h1>

      
      {/* {feedbacks.map((feedback,i) => {
        return (
          <>
            <p key={i}>{feedback.name}</p>{" "}
          </>
        );
      })} */}
    </div>
  );
};

export default MainPage;
