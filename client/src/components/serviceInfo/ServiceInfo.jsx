import "./serviceInfo.css";
import jwt from "jwt-decode";
import { useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWorkerId } from "../../reducer/worker/index";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const WSInfo = ({ setShowWorker }) => {
  const dispatch = useDispatch();
  const [yourName, setYourName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [order_Detalis, setOrder_Detalis] = useState();
  const [worker_id, setWorker_id] = useState();
  const [show, setShow] = useState(false);
  const { token, workers, users } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      workers: state.workerReducer.workers,
      users: state.usersReducer.users,
    };
  });

  const successRequest = (message) => {
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const wrongRegister = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops... " + message,
      text: " Fill All Required Inputs ..Please!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  };
  const sendRequest = async (e) => {
    e.preventDefault();
    //post /worker

    await axios
      .post(
        `/send_request`,
        {
          name: yourName,
          order_Detalis,
          address,
          phone,
          worker_id,
          email:jwt(token).email

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setYourName("");
        setAddress("");
        setPhone("");
        setOrder_Detalis("");

        setShow(!show);
        successRequest(
          "Your request has been successfully sent, you will receive an email to schedule an appointment"
        );
      })
      .catch((err) => {
        wrongRegister("An issue occurred, please try again later.");
      });
  };

  return (
    <>
      <i
        onClick={() => {
          setShowWorker(false);
        }}
      >
        <RiArrowGoBackLine className="back_icon" />
      </i>
      <div className="pageTitle">
        <h1>
          Workers<p>What we Can Do</p>
        </h1>
      </div>

      <div className="workerLst">
        {workers.map((worker, index) => {
          if (jwt(token).userId !== worker.user_id) {
            return (
              <div key={index} className="workerInfoInService">
                <div>
                  <img src={worker.image} alt={worker.name} />
                </div>

                <div className="worker_info">
                  <h3>
                    <span>Name: </span>
                    {worker.user_name}
                  </h3>
                  <p>
                    <span>Phone: </span>
                    {worker.phone}
                  </p>
                  <address>
                    <span>Address: </span>
                    {worker.address}
                  </address>
                </div>

                <div className="service_btn">
                  {users.some((user) => user.user_id === worker.user_id) && (
                    <button
                      onClick={() => {
                        dispatch(setWorkerId(worker.user_id));
                      }}
                    >
                      Live chat
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setWorker_id(worker.user_id);
                      setShow(true);
                    }}
                  >
                    send for
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      {show ? (
        <div className="popup_form">
          <i
            className="btn"
            onClick={() => {
              setShow(!show);
            }}
          >
            <AiOutlineCloseCircle />
          </i>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setYourName(e.target.value);
            }}
            value={yourName}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
          <input
            type="text"
            placeholder="Order Details"
            onChange={(e) => setOrder_Detalis(e.target.value)}
            value={order_Detalis}
          />
          <input
            type="number"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            maxLength="10"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
          />
          <button
            onClick={(e) => {
              sendRequest(e);
            }}
          >
            Send
          </button>
        </div>
      ) : null}
    </>
  );
};

export default WSInfo;
