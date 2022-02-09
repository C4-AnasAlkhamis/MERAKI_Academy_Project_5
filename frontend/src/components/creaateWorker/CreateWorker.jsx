import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setService,
  updateService,
  deleteService,
} from "../../reducer/service/index";
import { setWorker } from "../../reducer/worker/index";
const Worker = () => {
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [service_id, setService_id] = useState();
  const [image, setImage] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const { token, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
    };
  });
  const dispatch = useDispatch();
  const createWorker = () => {
    //post http://localhost:5000/worker

    await axios
      .post(
        `http://localhost:5000/worker`,
        {
          address,
          phone,
          image,
          service_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setService({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Add Your Service</h1>
      <form onSubmit={uploadImage}>
        <input
          type="text"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Select />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button>Add Service</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </div>
  );
};

export default Worker;
