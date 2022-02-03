/** @format */

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../reducer/item/index";
//===============================================================

const HomePage = () => {
  // ---------------------------------------------
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      items: state.itemsReducer.items,
    };
  });

  const { token, items } = state;

  const dispatch = useDispatch();
  // ---------------------------------------------
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

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
    getAllItems();
  }, []);

  //===============================================================

  return (
    <div className="homePage">
      {items.map((item, index) => {
        return (
          <div className="item">
            <div className="img_box">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="info_box">
            <p>{item.title}</p>
            <span>$ {item.price}</span>
            <span>{item.rate}</span>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
