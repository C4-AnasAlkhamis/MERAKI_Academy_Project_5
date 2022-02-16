/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainPage.css";

import headMainImag from "../../image/Main/slider-d (1).jpg";
import img_1 from "../../image/Main/2pieceKits.png";
import img_2 from "../../image/Main/Batteries.png";
import img_3 from "../../image/Main/Chargers.png";

import bosch from "../../image/Main/bosch.png";
import dewalt from "../../image/Main/dewalt.png";
import einhell from "../../image/Main/einhell.jpg";
import festool from "../../image/Main/festool.png";
import jcb from "../../image/Main/jcb.png";
import mafell from "../../image/Main/mafell.png";
import makita from "../../image/Main/makita.png";
import milwaukee from "../../image/Main/milwaukee.png";
import panasonic from "../../image/Main/panasonic.jpg";
import pasload from "../../image/Main/pasload.jpg";
import ryobi from "../../image/Main/ryobi.png";
import tjep from "../../image/Main/tjep.jpg";
import worx from "../../image/Main/worx.png";

const MainPage = () => {
  const [image, setImage] = useState([
    bosch,
    dewalt,
    einhell,
    festool,
    jcb,
    mafell,
    makita,
    milwaukee,
    panasonic,
    pasload,
    ryobi,
    tjep,
  ]);
  const [feedbacks, setFeedbacks] = useState([]);
  const getAllFeedBack = async () => {
    try {
      const res = await axios.get("/item/feedback");
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
          <h1>MORE GREAT DEALS</h1>
      <div className="showImg">
        <img src={img_1} />
        <img src={img_2} />
        <img src={img_3} />
      </div>
          <h1>BRANDS</h1>
      <div className="brandImg">
        {image.map((pic, i) => {
          return <img key={i} src={pic} />;
        })}
      <h1>____________________________________________________</h1>
      </div>

      <h1>FEEDBACK</h1>
      <div className="brandImg">
      {feedbacks.slice(feedbacks.length-4,feedbacks.length).map((feedback,i) => {
        return (
          <div className="feedbackDetails">
            <h5>{feedback.name}</h5>
            <h4>{feedback.subject}</h4>
            <p>{feedback.feedback}</p>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default MainPage;
