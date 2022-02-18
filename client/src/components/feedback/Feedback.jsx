/** @format */

// /** @format */

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

// // import { useNavigate, LINK } from "react-router-dom";
import "./feedback.css";

import Swal from "sweetalert2";


import emailjs from "emailjs-com";

// export default function FeedBack(){
const FeedBack = ({ setShow }) => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const sendFeedBack = () => {
    axios
      .post("/item/feedback", {
        name,
        email,
        subject,
        feedback,
      })
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const sendEmail = (e) => {
    sendFeedBack();
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0c3knvt",
        "template_02ihw4s",
        form.current,
        "user_HpGxyEqePdddiz4DOkw1R"
      )
      .then(
        (result) => {
          setShow(false);
        },
        (error) => {

        }
      );
    //   };
  };




  return (
    <>
      <div className="feedback">
        <form className="feedbackForm" ref={form} onSubmit={sendEmail}>
          <input
            id="sendBtn3"
            type="email"
            placeholder="Your Email Address"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            id="sendBtn2"
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            id="sendBtn1"
            type="text"
            placeholder="Subject"
            name="subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <textarea
            id="sendBtn4"
            placeholder="Your Message Content"
            cols="80"
            rows="10"
            name="message"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <div className="buttons">
            <input id="sendBtn5" type="submit" value="Send FeedBack " />
            <button
              onClick={() => {
                setShow(false);
              }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default FeedBack;
