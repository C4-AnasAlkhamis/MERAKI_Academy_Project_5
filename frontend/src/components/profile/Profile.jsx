import axios from "axios";
import "./profile.css"
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
      .put(`http://localhost:5000/worker/${id}`, {
        address,
        phone,
        image,
      })
      .then((result) => {
        console.log(result);
        getWorkerById();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(worker);
  useEffect(() => {
    getWorkerById();
    getRequestByWorker();
  }, []);
  return (
    <div className="profile">
      <div className="profileInfoS">
        <h1>Profile</h1>
        {worker.length ? (
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
      <div className="reqGroup">
            <table>
              <tbody>
            <tr>
            <th style={{width: "100px",textAlign:"Center"}}>Name</th>
            <th style={{width: "700px",textAlign:"Center"}}>Order Details</th>
            <th style={{width: "100px",textAlign:"Center"}}>Address</th>
            <th style={{width: "100px",textAlign:"Center"}}>Phone Number</th>
            <th style={{width: "100px",textAlign:"Center"}}>Approve</th>
            <th style={{width: "100px",textAlign:"Center"}}>Reject</th>
            </tr>
        {requests.map((req, index) => {
          return (
                  <tr>
              <tb>{req.name}</tb>
              <td>{req.order_Detalis}</td>
              <td>{req.address}</td>
              <td>{req.phone}</td>
              <td><button>Approve</button></td>
              <td><button>Reject</button></td>
              </tr>
          );
        })}
        </tbody>
                </table>
      </div>
      {show ? (
        <div className="editProfile">
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
          <button
            onClick={() => {
              uploadImage();
              setShow(false);
            }}
          >
            Add Service
          </button>

          <br />
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
