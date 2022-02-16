/** @format */

import axios from "axios";
import "./servicePage.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setService } from "../../reducer/service/index";
import { setWorkers } from "../../reducer/worker/index";
import WSInfo from "../serviceInfo/ServiceInfo";
import headPic from "../../image/logo2.png";
const ServicePage = () => {
  const [showWorker, setShowWorker] = useState(false);
  const { services } = useSelector((state) => {
    return {
      services: state.serviceReducer.services,
    };
  });
  const dispatch = useDispatch();
  //===============================================================

  const getAllService = async () => {
    try {
      const res = await axios.get("/service");
      if (res.data.success) {
        dispatch(setService(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
      }
    }
  };
  //===============================================================

  const getWorkerByServiceId = async (id) => {
    //get /worker/srv_id/id
    await axios
      .get(`/worker/srv_id/${id}`)
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
              <img className="headPicLogo" src={headPic} alt="icon" />
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
