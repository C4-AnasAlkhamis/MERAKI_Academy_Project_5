import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const AddService = () => {
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState();
  // ====================================== //
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const dispatch = useDispatch();
  const createNewService = async (e) => {
    e.preventDefault();

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
    } catch (error) {}
  };

  return (
    <>
      <h1>Add your Service</h1>
      <form onSubmit={createNewService}>
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
            setImage(e.target.value);
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
