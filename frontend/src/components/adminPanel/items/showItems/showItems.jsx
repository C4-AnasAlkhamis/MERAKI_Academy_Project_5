import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../../../reducer/item/index";
import { TiPencil } from "react-icons/ti";

const ShowItem = () => {
  //===============================================================
  const dispatch = useDispatch();
  const [id, setId] = useState();
  // const [is_deleted, setIs_deleted] = useState();
  // const [description, setDescription] = useState();
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
  const updateItemById = async (item_id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/item/${item_id}`,
        // { image, title, description, category, price },
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
                    <TiPencil />
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default ShowItem;
