/** @format */

// /** @format */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../reducer/item/index";

//===============================================================

const AddItem = () => {
  const history = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [category_id, setCategory_id] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const createNewItem = async (e) => {
    e.preventDefault();
    try {
      const item = {
        title,
        descriptions,
        img,
        price,
        category_id,
      };
      const result = await axios.post("http://localhost:5000/item", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(addItem({ title, descriptions, img, price, category_id }));
        setMessage("The item has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/homePage");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewItem}>
        <br />
        <input
          type="text"
          placeholder="item title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="item description here"
          onChange={(e) => setDescriptions(e.target.value)}></textarea>
        <br />
        <input
          type="number"
          placeholder="item price here"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="item category here"
          onChange={(e) => setCategory_id(e.target.value)}
        />
        <br />
        <input
          type="file"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <button>Create New item</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddItem;
// import "./register.css";
// import React, { useState } from "react";
// import axios from "axios";

// const AddItem = () => {
//   const [title, setTitle] = useState("");
//   const [descriptions, setDescriptions] = useState("");
//   const [img, setImg] = useState("");
//   const [price, setPrice] = useState(0);
//   const [category_id, setCategory_id] = useState(0);
//   const [message, setMessage] = useState("");
//   const [done, setDone] = useState(false);
//   const addItem = async (e) => {
//     e.preventDefault();
//     //   POST -> http://localhost:5000/user
//     await axios
//       .post("http://localhost:5000/item", {
//         title,
//         descriptions,
//         img,
//         price,
//         category_id,
//       })
//       .then((result) => {
//         if (result) setMessage(result.data.message);
//         setTitle("");
//         setDescriptions("");
//         setImg("");
//         setPrice(0);
//         setCategory_id(0)
//         setDone(true);
//       })
//       .catch((err) => {
//         setMessage(err.response.data.message);
//       });
//   };
//   return (
//     <div className="addItem">
//       <form onSubmit={addItem}>
//         <input
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//           value={title}
//           type="text"
//           placeholder="Title"
//         />

//         <button>Add</button>
//         <span
//           style={{
//             color: `${done ? "#24dc3a" : "#dc2424"}`,
//             textShadow: `1px 0 1px  ${done ? "#24dc3a" : "#dc2424"}`,
//           }}>
//           {message}
//         </span>
//       </form>
//     </div>
//   );
// };

// export default AddItem;
// //
