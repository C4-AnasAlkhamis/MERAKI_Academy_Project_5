import React, { useEffect, useState } from "react";
import "./wishlist.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";

import Swal from "sweetalert2";

const Wishlist = (id) => {
  const popupWishlistDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove!",
      confirmButtonColor: "#04518c",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          confirmButtonText: "Removed!",
          title: "Your item has been removed!.",
          icon: "success",
          confirmButtonColor: "#04518c",
        });
        deleteWishlistById(id);
      }
    });
  };

  const popupCart = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "This Item Added To Your Cart Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const dispatch = useDispatch();
  const { token, wishlists } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      wishlists: state.wishlistReducer.wishlists,
    };
  });

  const getWishlistById = async () => {
    await axios
      .get(`/wishlist/`, {
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

  const createNewCart = async (id) => {
    try {
      await axios.post(
        `/cart`,
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };
  const deleteWishlistById = async (id) => {
    //delete /wishlist/:id

    await axios
      .delete(`/wishlist/${id}`)
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
    <div className="cart">
      <div className="cart_nav_box">
        <ul>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTickIcon.png"
              alt="Price match promise"
            />
            <span>Price match promise</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSDeliveryIcon.png"
              alt="ext day delivery, 7 days a week"
            />
            <span>Next day delivery, 7 days a week</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPTrustpilotIcon.png"
              alt="5 Star Rating on Trustpilot"
            />
            <span>5 Star Rating on Trust pilot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPSHourIcon.png"
              alt="One Hour Delivery slot"
            />
            <span>One Hour Delivery slot</span>
          </li>
          <li>
            <img
              src="https://its-london.s3-eu-west-1.amazonaws.com/assets/USPDrillIcon.png"
              alt="Finance Available over £99 inc VAT"
            />
            <span>Finance Available over $99 inc VAT</span>
          </li>
        </ul>
      </div>

      <dir className="cart_header">
        <div>
          <h1>Your Wishlist Items</h1>
        </div>
      </dir>

      {wishlists.length > 0 ? (
        wishlists.map((wishlist, index) => {
          return (
            <div key={index} className="wishlist_box">
              <div className="cart_img_box">
                <div className="info_center">
                  <img src={wishlist.img} alt={wishlist.title} />
                </div>

                <div className="cart_title">
                  <span>{wishlist.title}</span>
                </div>
              </div>
              <div className="info_center">
                <h3>Price</h3>
                <span>{wishlist.price} $</span>
              </div>
              <div className=" btn_box ">
                <button
                  className="cart_btn"
                  style={{
                    borderColor: "#f22626",
                  }}
                  onClick={(e) => {
                    popupWishlistDelete(wishlist.wishlist_id);
                  }}
                >
                  <IoMdRemoveCircle className="icon_style_remove" /> wishlist
                </button>
                <button
                  className="cart_btn"
                  onClick={async (e) => {
                    popupCart();
                    await createNewCart(wishlist.item_id);
                    deleteWishlistById(wishlist.wishlist_id);
                  }}
                  style={{
                    display: `${wishlist.is_deleted ? "none" : "unset"}`,
                    borderColor: "#43d63e",
                  }}
                >
                  <IoIosAddCircle className="icon_style_add" />
                  To Cart
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Wishlist Yet!</div>
      )}
    </div>
  );
};

export default Wishlist;
