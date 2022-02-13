import { useSelector, useDispatch } from "react-redux";
import "./serviceInfo.css";
import { useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import axios from "axios";
const WSInfo = ({ setShowWorker }) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [order_Detalis, setOrder_Detalis] = useState();
  const [message, setMessage] = useState();
  const [worker_id, setWorker_id] = useState();
  const [show, setShow] = useState(false);
  const { token, workers } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      workers: state.workerReducer.workers,
    };
  });
  const sendRequest = async (e) => {
    e.preventDefault();
    //post http://localhost:5000/worker

    await axios
      .post(
        `http://localhost:5000/send_request`,
        {
          name,
          order_Detalis,
          address,
          phone,
          worker_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
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
          Workers<h6>What we Can Do</h6>
        </h1>
      </div>

      <div className="workerLst">
        {workers.map((worker, index) => {
          return (
            <div key={index} className="workerInfoInService">
              <div>
                <img src={worker.image} alt={worker.name} />
                <h1>{worker.user_name}</h1>
              </div>

              <small>{worker.phone}</small>
              <address>{worker.address}</address>
              <button
                onClick={() => {
                  setWorker_id(worker.user_id);
                  setShow(true);
                }}
              >
                send request
              </button>
            </div>
          );
        })}
      </div>
      {show ? (
        <div className="popup_form">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Order Details"
            onChange={(e) => setOrder_Detalis(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
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
