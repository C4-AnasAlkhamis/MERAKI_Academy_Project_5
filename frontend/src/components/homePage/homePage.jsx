/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems, setCategories } from "../../reducer/item/index";
//===============================================================

const HomePage = () => {
  // ---------------------------------------------
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      items: state.itemsReducer.items,
      categories: state.itemsReducer.categories,
    };
  });

  const { categories, token, items } = state;

  const dispatch = useDispatch();
  // ---------------------------------------------
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  //===============================================================

  const getAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/item", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setItems(res.data.items));
        setMessage("");
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

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
  //===============================================================

  //   const handleUpdateClick = (article) => {
  //     setUpdateBox(!updateBox);
  //     setArticleId(article.id);
  //     setTitle(article.title);
  //     setDescription(article.description);
  //     if (updateBox) updateArticle(article.id);
  //   };

  //===============================================================

  //   const updateArticle = async (id) => {
  //     try {
  //       await axios.put(`http://localhost:5000/articles/${id}`, {
  //         title,
  //         description,
  //       });
  //       getAllArticles();
  //       dispatch(updateArticleById({ title, description }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //===============================================================

  //   const deleteArticle = async (id) => {
  //     try {
  //       await axios.delete(`http://localhost:5000/articles/${id}`);
  //       getAllArticles();
  //       dispatch(deleteArticleById(id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //===============================================================

  //   const addComment = async (id) => {
  //     try {
  //       await axios.post(
  //         `http://localhost:5000/articles/${id}/comments`,
  //         {
  //           comment,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       getAllArticles();
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };

  //===============================================================

  useEffect(() => {
    getAllCategories();
    getAllItems();
  }, []);

  //===============================================================

  return (
    <div className="homePage">
      <div className="categories">
        <ul>
          {categories.map((category, indx) => {
            return (
              <>
                <li
                  id={category.id}
                  onClick={(e) => {
                    setCategoryId(e.target.id);
                  }}>
                  {category.category}
                </li>
              </>
            );
          })}
        </ul>
      </div>

      <div className="items">
        {items.map((item, index) => {
          // if(categoryId===item.category_id){
        //   console.log("item", item.category_id);
        //   console.log("category",categoryId,);
          return (
            <div className="item">
              {categoryId === item.category_id ? (
                <>
                  <div className="img_box">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="info_box">
                    <p>{item.title}</p>
                    <p>{item.descriptions}</p>
                    <span>$ {item.price}</span>
                    <span>{item.rate}</span>
                  </div>
                </>
               ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
