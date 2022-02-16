/** @format */

// /** @format */

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

// // import { useNavigate, LINK } from "react-router-dom";
import "./feedback.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
    // e.preventDefault();
    // emailjs
    //   .sendForm(
    //     "gmail",
    //     "template_02ihw4s",
    //     form.current,
    //     "user_HpGxyEqePdddiz4DOkw1R"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    // e.target.reset();

    // const sendEmail = (e) => {
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
          handleFeedBack();
          // console.log(result.text);
          setShow(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
    //   };
  };

  const handleFeedBack = () => {
    Swal.fire({
      title: message,
      text: "Thank You!.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17yFDa0Z570P-R8DmF8nbHu_emWyS5QkFfw&usqp=CAU",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };
  //   // const sendEmail = (e) => {
  //   //   e.preventDefault();

  //   //   emailjs
  //   //     .sendForm(
  //   //       "gmail",
  //   //       "template_02ihw4s",
  //   //       e.target,
  //   //       "user_HpGxyEqePdddiz4DOkw1R"
  //   //     )
  //   //     .then(
  //   //       (result) => {
  //   //         console.log(result.text);
  //   //       };

  //   //       (error) => {
  //   //         console.log(error.text);
  //   //       });

  //   //     e.target.reset()
  //   // };
  /* <form onSubmit={}> */

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

          {/* <button " onClick={sendEmail,handleFeedBack}>Send Email</button> */}

          {/* <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email Address" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message Content" cols="100" rows="17" />
          <input type="submit" value="Send Email" />  */}
        </form>
      </div>
    </>
  );
};
export default FeedBack;
