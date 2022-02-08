import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  addCategory,
  deleteCategory,
} from "../../../reducer/item/index";
import { FcDeleteRow } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";

import { VscGitPullRequestCreate } from "react-icons/vsc";

import "./categories.css";
const Category = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
    };
  });
  const { categories, token } = state;

  //=======================================
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

  //======================================
  const addNewCategory = async () => {
    try {
      const res = await axios.post("http://localhost:5000/category", {
        category,
      });
      if (res.data.success) {
        dispatch(
          addCategory({ category: category, id: res.data.result.insertId })
        );
        setCategory("");
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while creating new data");
    }
  };
  //======================================
  const deleteCategoryById = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/category/${id}`);
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(deleteCategory(id));
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while creating new data");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <h1>Category panel</h1>

      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>category</th>
            <th className="icon">delete</th>
            <th className="add icon">
              <i>
                <VscGitPullRequestCreate
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="btn"
                />
              </i>
            </th>
          </tr>
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.category}</td>
                <td>
                  <i>
                    <FcDeleteRow
                      onClick={() => {
                        deleteCategoryById(category.id);
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
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            type="text"
            placeholder="Category Name"
            value={category}
          />
          <button
            onClick={() => {
              addNewCategory();
              setShow(!show);
            }}
          >
            Add
          </button>
        </div>
      ) : null}
    </>
  );
};
export default Category;
