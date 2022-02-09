import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setService } from "../../reducer/service/index";
const ServicePage = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const dispatch = useDispatch();
  //===============================================================

  const getAllService = async () => {
    try {
      const res = await axios.get("http://localhost:5000/service");
      if (res.data.success) {
        dispatch(setService(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  const getServiceById = async (id) => {
    //get http://localhost:5000/setvice/id

    await axios
      .get(`http://localhost:5000/service/${id}`)
      .then((result) => {
        // dispatch(setServiceInfo({ ...result.data.result }));
        navigate("/service-info");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div> service</div>;
};

export default ServicePage;
