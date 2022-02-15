/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import headMainImag from "../../image/Main/slider-d2.jpg";
import img_1 from "../../image/Main/2pieceKits.png";
import img_2 from "../../image/Main/Batteries.jpg";
import img_3 from "../../image/Main/Chargers.jpg";

import  bosch from "../../image/Main/bosch.png";
import dewalt from "../../image/Main/dewalt";
import einhell from "../../image/Main/einhell";
import festool from "../../image/Main/festool";
import jcb from "../../image/Main/jcb";
import mafell from "../../image/Main/mafell";
import makita from "../../image/Main/makita";
import milwaukee from "../../image/Main/milwaukee";
import panasonic from "../../image/Main/panasonic";
import pasload from "../../image/Main/pasload";
import ryobi from "../../image/Main/ryobi";
import tjep from "../../image/Main/tjep";
import worx from "../../image/Main/worx";

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
      <div className="Hadar">
        <img src={headMainImag} />
      </div>
      <div className="showImg">
        <img src={img_1} />
        <img src={img_2} />
        <img src={img_3} />
      </div>
      <div className="showImg">
        <img src={img_1} />
        <img src={img_2} />
        <img src={img_3} />
      </div>

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
