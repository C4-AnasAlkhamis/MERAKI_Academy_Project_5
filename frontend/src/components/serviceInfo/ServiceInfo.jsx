import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
const WSInfo = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [order_Detalis, setOrder_Detalis] = useState();
  const [message, setMessage] = useState();
  const [worker_id, setWorker_id] = useState();

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
      <h1>ServiceInfo</h1>
      {workers.map((worker, index) => {
        return (
          <div key={index}>
            <div>
              <p>{worker.user_name}</p>
              <img src={worker.image} alt={worker.name} />
            </div>

            <small>{worker.phone}</small>
            <address>{worker.address}</address>
            <button
              onClick={() => {
                setWorker_id(worker.user_id);
              }}
            >
              send request
            </button>
          </div>
        );
      })}
      <div className="popup_form">
        <form onSubmit={""}>
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
        </form>
      </div>
    </>
  );
};

export default WSInfo;
