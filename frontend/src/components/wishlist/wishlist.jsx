import React, { useState, useEffect } from "react";
import "./wishlist.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";
const Wishlist = () => {
  const [notes, setNotes] = useState([
    { myNote: "I have buy new wheel" },
    { myNote: "I have buy new paint brush" },
  ]);
  const [note, setNote] = useState("");

  console.log(notes);

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

  const createNewCart = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/cart`,
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getWishlistById();
  }, []);
  return (
    //     <div className="Wishlist">
    //       <h1 className="Wishlist_title"> My Wishlist Content ... </h1>

    //       <div className="note">
    //         <h1>Reminder </h1>
    // <br></br>
    //         {notes.map((note, i) => {
    //           return (
    //             <div key={i}>
    //               <p>{note.myNote}</p>
    //             </div>
    //           );
    //         })}

    //         <input
    //           onChange={(e) => {
    //             setNote(e.target.value);
    //           }}
    //           type="text"
    //           placeholder="note"
    //         ></input>
    //         <button
    //         className="noteBttn"
    //           onClick={(e) => {
    //             setNotes([...notes, { myNote: note }]);
    //           }}
    //         >
    //           Note!
    //         </button>
    //       </div>
    //       {wishlists ? (
    //         wishlists.map((wishlist, index) => {
    //           return (
    //             <div key={index} className="box">
    //               <div className="wishlist_box">
    //                 <div>
    //                   <img src={wishlist.img} alt={wishlist.title} />
    //                 </div>
    //                 <div className="info_box_flex_column">
    //                   <span>{wishlist.title}</span>
    //                   <span>{wishlist.description}</span>
    //                   <br></br>
    //                   <br></br>

    //                   <span>
    //                     {wishlist.price}
    //                     {"  JOD"}
    //                   </span>
    //                   <span>{wishlist.rate}</span>
    //                   <br></br>
    //                   <br></br>

    //                   <button
    //                     className="wishlist_delete"
    //                     id={wishlist.id}
    //                     onClick={(e) => {
    //                       deleteWishlistById(wishlist.wishlist_id);
    //                     }}
    //                   >
    //                     Remove Item
    //                   </button>
    //                   <button
    //                     className="wishlist_add_cart"
    //                     id={wishlist.id}
    //                     onClick={(e) => {
    //                       createNewCart(wishlist.item_id);
    //                     }}
    //                   >
    //                     Add to Cart
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         })
    //       ) : (
    //         <div>No Wishlist Yet!</div>
    //       )}
    //     </div>
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
            <span>5 Star Rating on Trustpilot</span>
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
            <span>Finance Available over JD99 inc VAT</span>
          </li>
        </ul>
      </div>

      <dir className="cart_header">
        <div>
          <h1>YOUR WISHLISTS</h1>
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
                <h3>price</h3>
                <span>{wishlist.price} JOD</span>
              </div>
              <div className="info_box btn_box info_box_cart">
                <button
                  className="wishlist_btn"
                  style={{
                    borderColor: "#f22626",
                  }}
                  onClick={(e) => {
                    deleteWishlistById(wishlist.wishlist_id);
                  }}
                >
                  <IoMdRemoveCircle className="icon_style_remove" /> wishlist
                </button>
                <button
                  className="wishlist_btn"
                  style={{
                    borderColor: "#43d63e",
                  }}
                  onClick={(e) => {
                    createNewCart(wishlist.item_id);
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
        <div>no Wishlist</div>
      )}
    </div>
  );
};

export default Wishlist;
