import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../../../reducer/item/index";
import { TiPencil } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";

const ShowItem = () => {
  //===============================================================
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [show, setShow] = useState(false);

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
      items: state.itemsReducer.items,
    };
  });
  const { token, items } = state;

  const getAllItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/item/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        console.log(res);
        // setMessage("");
        // setUserId(res.data.userId);
        dispatch(setItems(res.data.item));
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        // return setMessage(error.response.data.message);
      }
      // setMessage("Error happened while Get Data, please try again");
    }
  };
  // image, title, description, category, price
  const inStock = async (id, is_deleted, description) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/item/stock/${id}`,
        { is_deleted, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res);
        // setMessage("");
        // setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        // return setMessage(error.response.data.message);
      }
      // setMessage("Error happened while Get Data, please try again");
    }
  };
  const updateItemById = async () => {
    await axios
      .put(`http://localhost:5000/item/${id}`, {
        image,
        title,
        description,
        category,
        price,
      })
      .then((result) => {
        // setMessage("Item has been updating successfully");
        console.log(result);
        // dispatch(
        //   updateItemInfo({
        //     image: image ? image : state.item.image,
        //     title: title ? title : state.item.title,
        //     description: description ? description : state.item.description,
        //     category: category ? category : state.item.category,
        //     price: price ? price : state.item.price,
        //     id: state.item.id,
        //   })
        // );
      })
      .catch((err) => {
        console.log(err);
        // setMessage("Error happened while updating the item");
      });
  };
  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setId(e.target.value);
          }}
          type="number"
          placeholder="Category id"
        />
        <button onClick={getAllItems}>Get</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th className="icon">delete</th>
            <th className="icon">update</th>
          </tr>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    src={item.img}
                    alt=""
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.descriptions}</td>
                <td>{item.price}</td>
                <td>
                  <label>
                    outOf stock
                    <input
                      onChange={(e) => {
                        // setIs_deleted(e.target.value);
                        // setDescription("OUT OF STOCK");
                        let id = item.id;
                        let is_deleted = e.target.value;
                        let description = "OUT OF STOCK";

                        inStock(id, is_deleted, description);
                      }}
                      type="radio"
                      name={item.id}
                      value={1}
                    />
                  </label>
                  <label>
                    in stock
                    <input
                      onChange={(e) => {
                        // setIs_deleted(e.target.value);
                        // setDescription("IN STOCK");
                        let id = item.id;
                        let is_deleted = e.target.value;
                        let description = "IN STOCK";

                        inStock(id, is_deleted, description);
                      }}
                      type="radio"
                      name={item.id}
                      value={0}
                    />
                  </label>
                </td>
                <td>
                  <i>
                    <TiPencil
                      className="btn"
                      onClick={() => {
                        setShow(!show);
                        setId(item.id);
                      }}
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
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="Image URl"
          />
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />
          <input
            type="number"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Category"
          />
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Price"
          />
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Description"
          />
          <button onClick={updateItemById}>update</button>
        </div>
      ) : null}
    </>
  );
};
export default ShowItem;
