/** @format */

import axios from "axios";
import "./showItem.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setItems,
  setCategories,
  updateItem,
  deleteItem,
} from "../../../../reducer/item/index";
import { TiPencil } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import Select from "react-select";
import { FcDeleteRow } from "react-icons/fc";

const ShowItem = () => {
  // ================================================  //
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState();
  const [message, setMessage] = useState();
  // ================================================  //

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
      items: state.itemsReducer.items,
    };
  });
  const { token, items, categories } = state;
  // ================================================  //

  const options = categories.map((element, index) => {
    return {
      value: element.id,
      label: element.category,
    };
  });
  // ================================================  //

  const getAllItems = async (category_id) => {
    try {
      const res = await axios.get(
        `/item/category/${category_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setMessage("");
        dispatch(setItems(res.data.item));
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  // ================================================  //
  const inStock = async (id, is_deleted, description, item) => {
    let stock = description;
    try {
      const res = await axios.put(
        `/item/stock/${id}`,
        { is_deleted, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(
          updateItem({
            img: item.img,
            title: item.title,
            descriptions: stock,
            category: item.category,
            price: item.price,
            is_deleted: is_deleted,
            id: item.id,
          })
        );
        setItem("");
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  // ================================================  //

  const updateItemById = async () => {
    await axios
      .put(`/item/${id}`, {
        image,
        title,
        description,
        category,
        price,
      })
      .then((result) => {
        setMessage("Item has been updating successfully");
        console.log(item);
        dispatch(
          updateItem({
            img: image ? image : item.img,
            title: title ? title : item.title,
            descriptions: description ? description : item.descriptions,
            category: category ? category : item.category,
            price: price ? price : item.price,
            is_deleted: item.is_deleted,
            id: item.id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error happened while updating the item");
      });
  };
  // ================================================  //

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setCategories(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  // ================================================  //
  const deleteItemById = async (item_id) => {
    try {
      const res = await axios.delete(`/item/${item_id}`);
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(deleteItem(item_id));
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
  // ================================================  //

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="showItemAdmin">
      <h2>Items</h2>
      <div className="show_filter">
        <Select
          onChange={(e) => {
            getAllItems(e.value);
          }}
          options={options}
          placeholder="Filter"
        />
      </div>
      <table className="showItemTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>State</th>
            <th>Price</th>
            <th className="icon">update</th>
            <th className="icon">delete</th>
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
                <td>
                  
                    <div style={{display:"flex"}}>
                    <input
                    style={{width:"20px"}}
                    checked={item.is_deleted === 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          let id = item.id;
                          let is_deleted = 0;
                          let description = "IN STOCK";

                          inStock(id, is_deleted, description, item);
                        } else {
                          let id = item.id;
                          let is_deleted = 1;
                          let description = "OUT OF STOCK";
                          inStock(id, is_deleted, description, item);
                        }
                      }}
                      type="checkbox"
                      name={item.id}
                      value={0}
                      // checked={item.is_deleted === 0}
                      />
                      <label style={{width:"80px",paddingTop:"13px"}}>
                       In Stock
                     </label>
                      </div>
                </td>
                <td>{item.price}</td>
                <td>
                  <i>
                    <TiPencil
                      className="btn"
                      onClick={() => {
                        setShow(!show);
                        setId(item.id);
                        setItem(item);
                      }}
                    />
                  </i>
                </td>
                <td>
                  <i>
                    <FcDeleteRow
                      className="btn"
                      onClick={() => {
                        // setId(item.id);
                        deleteItemById(item.id);
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
              setPrice(e.target.value);
            }}
            placeholder="price"
          />
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Description"
          />
          <Select
            onChange={(e) => {
              setCategory(e.value);
            }}
            options={options}
            placeholder="category"
          />
          <button
            onClick={() => {
              updateItemById();
              setShow(!show);
            }}>
            update
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default ShowItem;
