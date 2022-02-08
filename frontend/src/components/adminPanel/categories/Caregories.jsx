import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../../reducer/item/index";
import { BiPencil } from "react-icons/bi";
import { FcDeleteRow } from "react-icons/fc";

const Category = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
    };
  });
  const { categories, token } = state;

  //===============================================================
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
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <h1>Category panel</h1>
      <table>
        <tr>
          <th>id</th>
          <th>category</th>
        </tr>
        {categories.map((category) => {
          console.log(category);
          return (
            <tr>
              <td>{category.id}</td>
              <td>{category.category}</td>
              <td>
                <BiPencil />
              </td>
              <td>
                <FcDeleteRow />
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
export default Category;
