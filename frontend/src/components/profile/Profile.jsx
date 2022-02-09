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
const Profile = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const { token, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
    };
  });
  const dispatch = useDispatch();
  // service functions  ==========++++++++++==========

  //===============================================================
  const getServiceByUserId = async (id) => {
    //get http://localhost:5000/setvice/id

    await axios
      .get(`http://localhost:5000/service/user/${id}`)
      .then((result) => {
        dispatch(setService({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===============================================================
  const deleteServiceById = async (id) => {
    //delete http://localhost:5000/setvice/id

    await axios
      .delete(`http://localhost:5000/service/${id}`)
      .then((result) => {
        dispatch(deleteService({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===============================================================
  const updateServiceById = async (id) => {
    //put http://localhost:5000/setvice/id

    await axios
      .put(`http://localhost:5000/service/${id}`)
      .then((result) => {
        dispatch(updateService({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // worker functions  ==========++++++++++==========
  //===============================================================

  const getWorkerById = async (id) => {
    //get http://localhost:5000/worker/id

    await axios
      .get(`http://localhost:5000/worker/${id}`)
      .then((result) => {
        dispatch(setWorker({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //===============================================================
  const deleteWorkerById = async (id) => {
    //delete http://localhost:5000/worker/id

    await axios
      .delete(`http://localhost:5000/worker/${id}`)
      .then((result) => {
        dispatch(setWorker({}));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===============================================================
  const updateWorkerById = async (id) => {
    //put http://localhost:5000/worker/id

    await axios
      .put(`http://localhost:5000/worker/${id}`)
      .then((result) => {
        // dispatch(setWorker({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div> Profile</div>;
};

export default ServicePage;
