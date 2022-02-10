import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setService, addService } from "../../../reducer/service/index";
const AddService = () => {
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState();
  // ====================================== //
  const dispatch = useDispatch();
  const { token, isLoggedIn, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      services: state.serviceReducer.services,
    };
  });

  // ====================================== //
  const uploadImage = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        setImage(res.data.secure_url);
        createNewService(res.data.secure_url);
      });
  };
  // ====================================== //

  const createNewService = async (image) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/srvice`,
        { title, description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {}
  };
  // ====================================== //

  const getAllServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/service");
      if (res.data.success) {
        dispatch(setService([...res.data.result]));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  // ====================================== //
  console.log(services);
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <h1>Add your Service</h1>
      <form onSubmit={uploadImage}>
        <input
          type="text"
          placeholder="service title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="service description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setImage(e.target.files[0]);
          }}
        />
        <button>Add Service</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddService;
