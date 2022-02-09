import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

  return <div> Profile</div>;
};

export default ServicePage;
