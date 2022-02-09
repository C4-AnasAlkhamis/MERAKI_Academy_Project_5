import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setService,
  updateService,
  deleteService,
} from "../../reducer/service/index";
setWorker;
import { setWorker } from "../../reducer/worker/index";
const CreateWorker = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const { token, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
    };
  });
  const dispatch = useDispatch();

  return <div> Profile</div>;
};

export default CreateWorker;
