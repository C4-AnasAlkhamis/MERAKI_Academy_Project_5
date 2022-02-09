import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setService,
  updateService,
  deleteService,
} from "../../reducer/service/index";

const Profile = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const dispatch = useDispatch();
  //===============================================================
  const getServiceByUserId = async (id) => {
    //get http://localhost:5000/setvice/id

    await axios
      .get(`http://localhost:5000/service/user/${id}`)
      .then((result) => {
        dispatch(setServiceInfo({ ...result.data.result }));
        navigate("/service-info");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div> Profile</div>;
};

export default ServicePage;
