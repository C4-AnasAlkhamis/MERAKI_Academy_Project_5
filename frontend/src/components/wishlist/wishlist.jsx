import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { token, wishlists } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      wishlists: state.wishlistReducer.wishlists,
    };
  });

  const getWishlistById = async () => {
    await axios
      .get(`http://localhost:5000/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setWishlist(result.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(wishlists);
  const deleteWishlistById = async (id) => {
    //delete http://localhost:5000/wishlist/:id

    await axios
      .delete(`http://localhost:5000/wishlist/${id}`)
      .then((result) => {
        dispatch(deleteWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWishlistById();
  }, []);

  return (
    <div className="Wishlist">
      <h1>Wishlist content </h1>

      {wishlists ? (
        wishlists.map((wishlist, index) => {
          return (
            <div key={index}>
              <div className="wishlist_box">
                <div>
                  <img src={wishlist.img} alt={wishlist.title} />
                </div>
                <div className="info_box flex_column">
                  <span>{wishlist.title}</span>
                  <span>{wishlist.description}</span>
                  <span>{wishlist.price}</span>
                  <span>{wishlist.rate}</span>
                  <button
                    id={wishlist.id}
                    onClick={(e) => {
                      deleteWishlistById(wishlist.wishlist_id);
                    }}
                  >
                    Remove from wishlist
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>no wishlist</div>
      )}
    </div>
  );
};

export default Wishlist;
