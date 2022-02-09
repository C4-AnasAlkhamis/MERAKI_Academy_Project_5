import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
const WSInfo = () => {
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [service_id, setService_id] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState();
  const { token, workers } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      workers: state.workerReducer.workers,
    };
  });
  const sendRequest = async () => {
    //post http://localhost:5000/worker

    await axios
      .post(
        `http://localhost:5000/worker`,
        {
          // name,
          // orderDetails,
          // address,
          // phoneNUmber,
          // worker_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {})
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
            <img src={worker.image} alt={worker.name} />
            <small>{worker.phone}</small>
            <address>{worker.address}</address>
            <button onClick={() => {}}>send request</button>
          </div>
        );
      })}
      <div>
        <form onSubmit={""}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Order Details"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button>send request</button>
        </form>
      </div>
    </>
  );
};

export default WSInfo;
