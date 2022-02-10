import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsw from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setRequests } from "../../reducer/service/index";

import { setWorkers } from "../../reducer/worker/index";
const Profile = () => {
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [service_id, setService_id] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { token, services, worker, requests } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
      worker: state.workerReducer.workers,
      requests: state.serviceReducer.requests,
    };
  });
  const dispatch = useDispatch();
  // service functions  ==========++++++++++==========

  //===============================================================
  // const getServiceByUserId = async (id) => {
  //   //get http://localhost:5000/setvice/id

  //   await axios
  //     .get(`http://localhost:5000/service/user/${id}`)
  //     .then((result) => {
  //       dispatch(setService({ ...result.data.result }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //===============================================================
  // const deleteServiceById = async (id) => {
  //   //delete http://localhost:5000/setvice/id

  //   await axios
  //     .delete(`http://localhost:5000/service/${id}`)
  //     .then((result) => {
  //       dispatch(deleteService({ ...result.data.result }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //===============================================================
  // const updateServiceById = async (id) => {
  //   //put http://localhost:5000/setvice/id

  //   await axios
  //     .put(`http://localhost:5000/service/${id}`)
  //     .then((result) => {
  //       dispatch(updateService({ ...result.data.result }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // worker functions  ==========++++++++++==========
  //===============================================================

  const getWorkerById = async () => {
    //get http://localhost:5000/worker/id
    await axios
      .get(`http://localhost:5000/worker/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setWorkers([...result.data.result]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(worker[0]);

  const getRequestByWorker = async () => {
    //get http://localhost:5000/worker/id
    await axios
      .get(`http://localhost:5000/send_request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setRequests([...result.data.result]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //===============================================================
  // const deleteWorkerById = async (id) => {
  //   //delete http://localhost:5000/worker/id

  //   await axios
  //     .delete(`http://localhost:5000/worker/${id}`)
  //     .then((result) => {
  //       dispatch(setWorker({}));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // ================================================  //

  const uploadImage = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", imageUrl);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        updateWorkerById(res.data.secure_url);
      });
  };
  //===============================================================
  const updateWorkerById = async (image) => {
    //put http://localhost:5000/worker/id
    const id = jsw(token).userId;

    await axios
      .put(
        `http://localhost:5000/worker/${id}`,
        {
          address,
          phone,
          image,
          service_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getWorkerById();
    getRequestByWorker();
  }, []);
  return (
    <>
      <div>
        <h1>Profile</h1>
        {worker.length ? (
          // worker
          // requests
          <div>
            <h3>{worker[0].user_name}</h3>
            <img src={worker[0].image} alt={worker[0].user_name} />
            <address>{worker[0].address}</address>
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              edit profile
            </button>
          </div>
        ) : null}
      </div>

      {show ? (
        <div>
          <form
            onSubmit={() => {
              uploadImage();
              setShow(false);
            }}
          >
            <input
              type="text"
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => {
                setImageUrl(e.target.files[0]);
              }}
            />
            <button>Add Service</button>
          </form>
          <br />
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      ) : null}
    </>
  );
};

export default Profile;
