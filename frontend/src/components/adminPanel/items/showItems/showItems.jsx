import axios from "axios";
import "./showItem.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../../../reducer/item/index";
import { TiPencil } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import Select from "react-select";

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
        `http://localhost:5000/item/category/${category_id}`,
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
        setMessage("");
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
      .put(`http://localhost:5000/item/${id}`, {
        image,
        title,
        description,
        category,
        price,
      })
      .then((result) => {
        setMessage("Item has been updating successfully");
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
  // ================================================  //

  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category", {
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
  const deleteItemById = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/item/${id}`);
      if (res.data.success) {
        setMessage(res.data.success);
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
    <>
      <div className="show_filter">
        <Select
          onChange={(e) => {
            getAllItems(e.value);
          }}
          options={options}
          placeholder="Filter"
        />
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
                <td>{item.descriptions}</td>
                <td>{item.price}</td>
                <td>
                  <label>
                    outOf stock
                    <input
                      onChange={(e) => {
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
                        setItem(item);
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
          <button onClick={updateItemById}>update</button>
        </div>
      ) : null}
    </>
  );
};
export default ShowItem;
