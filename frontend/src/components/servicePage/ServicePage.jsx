import axios from "axios";
import "./servicePage.css"
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
    console.log(id);
    await axios
      .get(`http://localhost:5000/worker/srv_id/${id}`)
      .then((result) => {
        dispatch(setWorkers([...result.data.result]));
        console.log(result);
        // navigate("/service-info");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllService();
  }, []);
  console.log(workers);
  return (
    <div className="servicePage">
            <div className="pageTitle">
        <h1>
          POPULAR SERVICES<h6>What we Can Do</h6>
        </h1>
      </div>
      {!showWorker ? (
        <>
          {/* <h1>service</h1> */}
          <div className="services">
            {services.map((service, index) => {
              return (
                <div key={index} className="service">
                  <img src={service.image} alt={service.title} />
                  <h2>{service.title}</h2>
                  <small>{service.description}</small>
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
