import axios from "axios";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../../../reducer/item/index";

const ShowItem = () => {
  //===============================================================
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
      items: state.itemsReducer.items,
    };
  });
  const { token, items } = state;

  const options = [
    { value: "Grinder", label: "Grinder" },
    { value: "Inflator", label: "Inflator" },
  ];
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
                  <Select
                    onChange={(e) => {}}
                    options={options}
                    placeholder="change stoke"
                  />
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
