import React, { useState, useEffect } from "react";
import "./addservice.css"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setService,
  deleteService,
  updateService,
} from "../../../reducer/service/index";
import { FcDeleteRow } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { VscGitPullRequestCreate } from "react-icons/vsc";
const AddService = () => {
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [message, setMessage] = useState();
  const [show, setShow] = useState();
  const [iD, setID] = useState();
  // const [update, setUpdate] = useState(false);
  // ====================================== //
  const dispatch = useDispatch();
  const { token, isLoggedIn, services } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      services: state.serviceReducer.services,
    };
  });

  // ====================================== //
  const uploadImage = (update) => {
    const formData = new FormData();

    formData.append("file", imagePath);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        if (update) {
          updateServiceById(res.data.secure_url);
        } else {
          createNewService(res.data.secure_url);
        }
      });
  };
  // ====================================== //

  const createNewService = async (image) => {
    console.log("555");
    try {
      const result = await axios.post(
        `/service`,
        { title, description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllServices();
    } catch (error) {
      console.log(error.response);
    }
  };
  // ====================================== //

  const getAllServices = async () => {
    try {
      const res = await axios.get("/service");
      if (res.data.success) {
        dispatch(setService([...res.data.result]));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //======================================
  const deleteServiceById = async (id) => {
    try {
      const res = await axios.delete(`/service/${id}`);
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(deleteService(id));
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while deleting new data");
    }
  };
  // ====================================== //
  const updateServiceById = async (image) => {
    console.log(image);
    try {
      const res = await axios.put(`/service/${iD}`, {
        title,
        description,
        image,
      });
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(
          updateService({
            title,
            description,
            image: image ? image : imageUrl,
            id: iD,
          })
        );
      }
    } catch (error) {
      console.log(error.response);
      // if (!error.response.data.success) {
      //   return setMessage(error.response.data.message);
      // }
      setMessage("Error happened while updating new data");
    }
  };
  // ====================================== //

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <div className="showServiceAdmin">
      <h1 className="head_table">Services</h1>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>title</th>
            <th>description</th>

            <th className="icon">delete</th>
            <th className="icon">update</th>
            <th
              onClick={() => {
                setShow(!show);
              }}
              className="add icon"
            >
              <i>
                <VscGitPullRequestCreate className="btn" />
              </i>
            </th>
          </tr>
          {services.map((service, index) => {
            return (
              <tr key={index}>
                <td>{service.id}</td>
                <td>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    src={service.image}
                    alt={service.title}
                  />
                </td>
                <td>{service.title}</td>
                <td>{service.description}</td>

                <td>
                  <i>
                    <FcDeleteRow
                      onClick={() => {
                        deleteServiceById(service.id);
                      }}
                      className="btn"
                    />
                  </i>
                </td>
                <td>
                  <i>
                    <TiPencil
                      onClick={() => {
                        setID(service.id);
                        setImageUrl(service.image);
                        setShow(!show);
                      }}
                      className="btn"
                    />
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {show ? (
        <div className="input_box">
          <FaTimesCircle
            onClick={() => {
              setShow(!show);
            }}
            className="btn esc"
          />
          <input
            type="text"
            placeholder="service title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="service description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => {
              setImagePath(e.target.files[0]);
            }}
          />
          <button
            onClick={() => {
              uploadImage();
              setShow(!show);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              if (imagePath) {
                uploadImage(true);
              } else {
                updateServiceById();
              }
              setShow(!show);
            }}
          >
            Update
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AddService;
