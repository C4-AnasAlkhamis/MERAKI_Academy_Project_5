/** @format */
import axios from "axios";
import "./profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsw from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setRequests, deleteRequests } from "../../reducer/service/index";
import Swal from "sweetalert2";

import { setWorkers } from "../../reducer/worker/index";
const Profile = () => {
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [show, setShow] = useState(false);

  const popupCart = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "The email has been sent successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const approvedSubject = "Approved Application";
  const rejectedSubject = "Rejected Application";

  const approvedDescription =
    "We are so happy to work with you keep in touch we will contact with you as soon as possible";
  const rejectedDescription =
    "We are so sorry to inform you that your application rejected!";

  const deleteRequestById = async (id) => {
    //get /worker/id
    await axios
      .delete(`/send_request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(deleteRequests(id));
      })
      .catch((err) => {});
  };
  const onSubmit = async (to, subject, description, id) => {
    await axios.post("/mail", { to, subject, description }).then((response) => {
      popupCart();
      deleteRequestById(id);
    });
  };

  const { token, services, worker, requests } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      services: state.serviceReducer.services,
      worker: state.workerReducer.workers,
      requests: state.serviceReducer.requests,
    };
  });
  const dispatch = useDispatch();
  // worker functions  ==========++++++++++==========
  const getWorkerById = async () => {
    //get /worker/id
    await axios
      .get(`/worker/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setWorkers([...result.data.result]));
      })
      .catch((err) => {});
  };

  const getRequestByWorker = async () => {
    //get /worker/id
    await axios
      .get(`/send_request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setRequests([...result.data.result]));
      })
      .catch((err) => {});
  };

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
    //put /worker/id

    const id = jsw(token).userId;
    await axios
      .put(`/worker/${id}`, {
        address,
        phone,
        image,
      })
      .then((result) => {
        getWorkerById();
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getWorkerById();
    getRequestByWorker();
  }, []);
  return (
    <div className="profile">
      {worker.length ? (
        <div className="profileInfoS">
          <img src={worker[0].image} alt={worker[0].user_name} />
          <h1 style={{ paddingBottom: "10px" }}>{worker[0].user_name}</h1>
          <p style={{ paddingBottom: "10px" }}>{worker[0].address}</p>
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Back" : "Edit Profile"}
          </button>
        </div>
      ) : null}
      {!show ? (
        <div className="reqGroup">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "100px", textAlign: "Center" }}>Name</th>
                <th style={{ width: "200px", textAlign: "Center" }}>
                  Order Details
                </th>
                <th style={{ width: "100px", textAlign: "Center" }}>Address</th>
                <th style={{ width: "100px", textAlign: "Center" }}>
                  Phone Number
                </th>
                <th style={{ width: "100px", textAlign: "Center" }}>Email</th>
                <th style={{ width: "100px", textAlign: "Center" }}>Reject</th>
                <th style={{ width: "100px", textAlign: "Center" }}>Approve</th>
              </tr>
              {requests.map((req, index) => {
                return (
                  <tr key={index}>
                    <td>{req.name}</td>
                    <td>{req.order_Detalis}</td>
                    <td>{req.address}</td>
                    <td>{req.phone}</td>
                    <td>{req.email}</td>

                    <td>
                      <button
                        style={{ borderColor: "#43d63e" }}
                        className="approve"
                        onClick={() => {
                          onSubmit(
                            req.email,
                            approvedSubject,
                            approvedDescription,
                            req.id
                          );
                        }}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject"
                        style={{ borderColor: "#f22626" }}
                        onClick={() => {
                          onSubmit(
                            req.email,
                            rejectedSubject,
                            rejectedDescription,
                            req.id
                          );
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
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
            Done
          </button>

          <br />
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default Profile;
