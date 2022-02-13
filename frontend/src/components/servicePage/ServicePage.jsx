/** @format */

import axios from "axios";
import "./servicePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setService } from "../../reducer/service/index";
import { setWorkers } from "../../reducer/worker/index";
import WSInfo from "../serviceInfo/ServiceInfo";
const ServicePage = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [showWorker, setShowWorker] = useState(false);
  const { token, services, workers } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
      workers: state.workerReducer.workers,
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

  const getWorkerByServiceId = async (id) => {
    //get http://localhost:5000/worker/srv_id/id
    await axios
      .get(`http://localhost:5000/worker/srv_id/${id}`)
      .then((result) => {
        dispatch(setWorkers([...result.data.result]));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllService();
  }, []);
  return (
    <div className="servicePage">
      {!showWorker ? (
        <>
          <div className="pageTitle">
            <h1>
              POPULAR SERVICES<p>What we Can Do</p>
            </h1>
          </div>
          {/* <h1>service</h1> */}
          <div className="services">
            {services.map((service, index) => {
              return (
                <div key={index} className="service">
                  <img src={service.image} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button
                    onClick={(e) => {
                      getWorkerByServiceId(service.id);
                      setShowWorker(true);
                    }}
                  >
                    show service
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <WSInfo setShowWorker={setShowWorker} />
      )}
    </div>
  );
};

export default ServicePage;
