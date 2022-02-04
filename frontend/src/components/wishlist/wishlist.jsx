
import React, { useState, useEffect } from "react";
import { useNavigate, LINK } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      wishlists: state.wishlistReducer.wishlists,
    };
  });

  const getWishlistById = async () => {
    //get http://localhost:5000/wishlist/:id

    await axios
      .get(`http://localhost:5000/wishlist/`)
      .then((result) => {
        dispatch(setWishlist({ ...result.data.result }));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlistById = async () => {
    //delete http://localhost:5000/wishlist/:id

    await axios
      .delete(`http://localhost:5000/wishlist/`)
      .then((result) => {
        // setMessage("wishlist has been deleted ");
        // setIsDeleted(true);
        dispatch(deleteWishlist(""));
      })
      .catch((err) => {
        console.log(err);
        // setMessage("Error happened while deleting the wishlist");
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlist/${token.userId}`)
      .then((res) => {
        dispatch(setWishlist(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Wishlist">
      <h1>Wish list </h1>
    </div>
  );
};

export default Wishlist;
