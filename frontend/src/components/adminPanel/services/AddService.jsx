import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setService, addService } from "../../../reducer/service/index";
import { FcDeleteRow } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { VscGitPullRequestCreate } from "react-icons/vsc";
const AddService = () => {
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState();
  const [show, setShow] = useState();
  const [id, setId] = useState();
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
  const uploadImage = (e) => {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        setImage(res.data.secure_url);
        createNewService(res.data.secure_url);
      });
  };
  // ====================================== //

  const createNewService = async (image) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/srvice`,
        { title, description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {}
  };
  // ====================================== //

  const getAllServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/service");
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
  const deleteServiceById = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/category/${id}`);
      if (res.data.success) {
        setMessage(res.data.success);
        // dispatch(deleteCategory(id));
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
  const updateServiceById = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/category/${id}`, {
        title,
        description,
        image,
      });
      if (res.data.success) {
        setMessage(res.data.success);
        // dispatch(updateCategory({ category: category, id: id }));
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while updating new data");
    }
  };
  // ====================================== //

  console.log(services);
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <>
      <h1 className="head_table">Add your Service</h1>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>title</th>

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
                <td>{service.image}</td>
                <td>{service.title}</td>
                <td>
                  <i>
                    <FcDeleteRow
                      onClick={() => {
                        setId(service.id);
                        deleteServiceById();
                      }}
                      className="btn"
                    />
                  </i>
                </td>
                <td>
                  <i>
                    <TiPencil
                      onClick={() => {
                        setShow(!show);
                        setId(service.id);
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
              console.log(e.target.files[0]);
              setImage(e.target.files[0]);
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
              updateServiceById();
              setShow(!show);
            }}
          >
            Update
          </button>
        </div>
      ) : null}
    </>
  );
};

export default AddService;
