import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsw from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  setService,
  updateService,
  deleteService,
} from "../../reducer/service/index";
import { setWorker } from "../../reducer/worker/index";
const Profile = () => {
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [service_id, setService_id] = useState();
  const [imageUrl, setImageUrl] = useState("");
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
    const id = jsw(token).userId;
    await axios
      .get(`http://localhost:5000/worker/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  const updateWorkerById = (image) => {
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
  }, []);
  return (
    <>
      <div>
        <h1>Profile</h1>
      </div>

      <div>
        <h1>Add Your Service</h1>
        <form onSubmit={uploadImage}>
          <input
            type="text"
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Select
            options={options}
            onChange={(e) => {
              setService_id(e.value);
            }}
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
    </>
  );
};

export default Profile;
