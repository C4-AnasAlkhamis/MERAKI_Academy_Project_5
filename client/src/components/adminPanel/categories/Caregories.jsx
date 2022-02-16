import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../reducer/item/index";
import { FcDeleteRow } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { VscGitPullRequestCreate } from "react-icons/vsc";

import "./categories.css";
const Category = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [id, setId] = useState();
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

  //======================================
  const addNewCategory = async () => {
    try {
      const res = await axios.post("/category", {
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
  const deleteCategoryById = async () => {
    try {
      const res = await axios.delete(`/category/${id}`);
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
      setMessage("Error happened while deleting new data");
    }
  };
  //======================================
  const updateCategoryById = async () => {
    try {
      const res = await axios.put(`/category/${id}`, {
        category,
      });
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(updateCategory({ category: category, id: id }));
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

  useEffect(() => {
    getAllCategories();
  }, []);
  //======================================

  return (
    <div className="categoryAdmin">
      <h2 className="head_table">Category panel</h2>

      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>category</th>
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
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.category}</td>
                <td>
                  <i>
                    <FcDeleteRow
                      onClick={() => {
                        setId(category.id);
                        deleteCategoryById();
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
                        setId(category.id);
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
          <div className="addUpdateBTN">
          <button
            onClick={() => {
              addNewCategory();
              setShow(!show);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              updateCategoryById();
              setShow(!show);
            }}
          >
            Update
          </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Category;
