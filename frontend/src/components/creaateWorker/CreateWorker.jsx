import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

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
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  // ================================================  //
  const dispatch = useDispatch();

  const { token, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
    };
  });
  // ================================================  //

  const options = services.map((element, index) => {
    return {
      value: element.id,
      label: element.service,
    };
  });
  // ================================================  //

  const uploadImage = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", imageUrl);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        createWorker(res.data.secure_url);
      });
  };
  // ================================================  //

  const createWorker = (image) => {
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
        <Select options={options} />
        <input
          type="file"
          onChange={(e) => {
            setImageUrl(e.target.files[0]);
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
